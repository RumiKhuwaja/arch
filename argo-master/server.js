const path = require('path')
const crypto = require('crypto')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const {
  check,
  body,
  santizeBody,
  validationResult
} = require('express-validator')
const sgMail = require('@sendgrid/mail')
const { emailHTML } = require('./emailHTML')

const SESSION_ID_SIZE = 16  // size in bytes of session ID to generate

const app = express()
const port = process.env.PORT || 5000
// randomly generated secret from https://www.grc.com/passwords.htm
// given by SO answer https://stackoverflow.com/a/55597758
// TODO: move this to authentication server
const secret = 'Y;t[FF,0U7(>mJK#A:1N-r)?TCG~cPN*6C*g3b`dV[Ulem!P~Z;2j"p7m#>ihzH'
const sendGridApiKey = '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'
const frontendURL = process.env.PORT ? 
  'argo-heroku.herokuapp.com' : 
  'localhost:3000'

sgMail.setApiKey(sendGridApiKey)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const mongoURI = 'mongodb+srv://admin:YEh4rTxqMYJYR2zb@argo-rnuqa.azure.mongodb.net/users?retryWrites=true&w=majority'
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.pluralize(null)

// define user schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  phoneNumber:{ type: String, maxlength: 20 },
  email: { type: String, required: true, unique: true, maxlength: 255 },
  isVerified: { type: Boolean, default: false },
  password: { type: String, required: true, maxlength: 1024 },
  passwordResetToken: String,
  passwordResetExpires: Date,
  traits: {
    userDescription: {
      athletics: {
        achillesTendon: String
      },
      skincare: {
        sebumProduction: String
      }
    },
    providerDescription: {
      athletics: {
        achillesTendon: String
      },
      skincare: {
        sebumProduction: String
      }
    }
  }
}, { timestamps: true })

// define service provider schema
const providerSchema = new mongoose.Schema({
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  phoneNumber:{ type: String, maxlength: 20 },
  email: { type: String, required: true, unique: true, maxlength: 255 },
  domain: { type: String, required: true},  // type of business server provider works in
  isVerified: { type: Boolean, default: false },
  password: { type: String, required: true, maxlength: 1024 },
  passwordResetToken: String,
  passwordResetExpires: Date
}, { timestamps: true })

// define sign up token schema
const tokenSchema = new mongoose.Schema({
  _userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'},
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
})

// define session schema
const sessionSchema = new mongoose.Schema({
  _id: String,
  _userID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'}
}, { timestamps: true })

// define models
const UserModel = new mongoose.model('user', userSchema)
const ProviderModel = new mongoose.model('provider', providerSchema)
const TokenModel = new mongoose.model('token', tokenSchema)
const SessionModel = new mongoose.model('session', sessionSchema)

app.get('/verify-token', verifyTokenExists, verifyToken, (req, res) => {
  res.status(200).send({ message: 'verified' })
})

app.get('/verify-cookie', verifyCookie, (req, res) => {
  res.status(200).send({ message: 'verified' })
})

app.get('/get-id', verifyTokenExists, verifyToken, async (req, res) => {
  console.log(req.email)
  // generate random bytes to uniquely identify user session
  let sessionID
  let counter = 0
  while (counter === 0 || await SessionModel.findOne({ _id: sessionID }).exec()) {
    sessionID = crypto.randomBytes(SESSION_ID_SIZE).toString('hex')
    counter += 1
  }
  // Make session ID with email in database
  const user = await UserModel.findOne({ email: req.email }).exec()
  const newSession = new SessionModel({ _id: sessionID, _userID: user._id})
  await newSession.save()

  // Remove session data after specifed period of time in seconds
  setTimeout(() => {
    SessionModel.deleteOne({ _id: sessionID }, (err, doc) => {
    })
  }, 32000)

  res.status(200).send({ id: sessionID })
})

// TODO: add API rate limiting via https://github.com/nfriedly/express-rate-limit
app.post('/post-id', verifyTokenExists, verifyToken, async function (req, res) {
  // given user and session ids and provider id, returns relevant
  // service data
  try{
    console.log(req.body.id)
    const re = /^[0-9a-z]+$/
    const { id } = req.body

    // check if id has incorrect length or is not alphanumeric
    // (this filters out random QR codes the user might scan)
    // NOTE: `SESSION_ID_SIZE` is multiplied by 2 since each character
    // is 2 bytes in length
    if (id.length !== 2*SESSION_ID_SIZE || !re.test(id)) {
      res.status(400).send({ message: 'invalid id' })
    }

    const session = await SessionModel.findOne({ _id: id }).exec()
    if (!session) {
      res.status(400).send({ message: 'session expired' })
    }
    const user = await UserModel.findOne({ _id: session._userID }).exec()
    if (!user) {
      res.status(400).send({ message: 'user does not exist' })
    }
    const provider = await ProviderModel.findOne({ email: req.email }).exec()
    if (!provider) {
      res.status(500).send({ message: 'server error' })
    }
    const { firstName } = user
    const { domain } = provider
    const userData = user.traits.providerDescription[domain]
    console.log(userData)
    res.status(200).send({ message: 'success', userData, firstName })

  } catch (error) {
    console.log(error)
    res.status(500).send({message: 'server error', error})
  }


  // TODO: this route also requires a service ID to validate
  // TODO: how to prevent service provider from reverse engineering
  // app and using their token to arbitrarily query database?
})

app.post('/register', [body('email').isEmail().normalizeEmail()], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ message: 'invalid email', errors: errors.array() })
    
    // check if user exists
    if (await UserModel.findOne({ email: req.body.email }).exec()) {
      return res.status(400).send({ message: 'already exists' })
    }
    
    req.body.password = await argon2.hash(req.body.password, {
      type: argon2.argon2id
    })

    const user = new UserModel(req.body)
    await user.save()

    const token = new TokenModel({ _userID: user._id, token: crypto.randomBytes(32).toString('hex') })
    await token.save()

    // send confirmation email
    const msg = {
      to: req.body.email,
      from: 'no-reply@argo.com',
      subject: 'Welcome to Argo! Please confirm your email address.',
      // html: emailHTML(req.headers.host, token.token)
      html: emailHTML(frontendURL, req.body.email, token.token)
    }
    sgMail.send(msg)
    res.status(200).send({ message: 'verification email sent' })

  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/login', [body('email').isEmail().normalizeEmail()], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).send({ message: 'not valid email', errors: errors.array() })

    let user
    if (req.query && req.query.userType && req.query.userType === 'provider') {
      user = await ProviderModel.findOne({ email: req.body.email }).exec()
    } else {
      user = await UserModel.findOne({ email: req.body.email }).exec()
    }
    if (!user) return res.status(401).send({ message: 'email' })

    const passwordMatch = await argon2.verify(user.password, req.body.password)
    if (!passwordMatch) return res.status(401).send({ message: 'password' })

    if (!user.isVerified) return res.status(401).send({ message: 'not verified' })

    jwt.sign({user}, secret, { expiresIn: '7d' }, (err, token) => {
      if (req.query && req.query.type == 'json') {
        res.status(200).json({
          token,
          message: 'successful'
        })
      } else {
        res.status(200).cookie('token', token, { httpOnly: true }).send({ message: 'good' })
      }
    })
    // res.send(verified)  // serve the good stuff here
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/confirmation', async (req, res) => {
  // verifies user when they navigate to the confirmation route with the token 
  // given in the email
  // guide here: https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
  try {
    console.log(req.body)
    const token = await TokenModel.findOne({ token: req.body.token }).exec()
    if (!token) return res.status(400).send({ message: 'not verified' })
  
    const user = await UserModel.findOne({ _id: token._userID }).exec()
    if (!user) return res.status(400).send({ message: 'user does not exist' })
    if (user.isVerified) return res.status(400).send({ message: 'user already verified' })

    user.isVerified = true
    await user.save()
    // await TokenModel.deleteOne({ _id: token._id }, (err, doc) => console.log('error', err))

    res.status(200).send({ message: 'verified successfully' })
  } catch (error) {
    res.status(500).send({ error })
  }
})

app.post('/resend-verification', [
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  // resends email verification token
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
    
    // check if user exists
    const user = await UserModel.findOne({ email: req.body.email }).exec()
    if (!user) return res.status(400).send({ message: 'user does not exist' })
    if (user.isVerified) return res.status(400).send({ message: 'user already verified' })

    // create new verification token
    const token = new TokenModel({ _userID: user._id, token: crypto.randomBytes(32).toString('hex') })
    await token.save()

    // send confirmation email
    const msg = {
      to: req.body.email,
      from: 'no-reply@argo.com',
      subject: 'Welcome to Argo! Please confirm your email address.',
      // html: emailHTML(req.headers.host, token.token)
      html: emailHTML(frontendURL, req.body.email, token.token)
    }
    sgMail.send(msg)
    res.status(200).send({ message: 'verification email sent' })

  } catch (error) {
    res.status(500).send(error)
  }
})

function verifyTokenExists(req, res, next) {
  // verify token middleware, tutorial here https://www.youtube.com/watch?v=7nafaH9SddU
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next()
  } else {
    console.log('failed')
    res.status(403).send({ message: 'No authentication token provided' })
  }
}

function verifyToken(req, res, next) {
  jwt.verify(req.token, secret, (err, authData) => {
    if (err) {
      res.status(403).send({ message: 'Authentication token not valid' })
    } else {
      req.email = authData.user.email
      next()
    }
  })
}

function verifyCookie(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    res.status(401).send({ message: 'No token provided' })
  } else {
    jwt.verify(token, secret, (err, authData) => {
      if (err) {
        res.status(403).send({ message: 'Authentication token not valid' })
      } else {
        req.email = authData.user.email
        next()
      }
    })
  }
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
  })
}

app.listen(port, () => console.log(`Listening on port ${port}`))