import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { withRouter } from "react-router-dom"

import Navbar from "../generic-components/Navbar"
import Copyright from "../generic-components/Copyright"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default withRouter(function SignUp(props) {

  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [reEnteredPassword, setReEnteredPassword] = React.useState('')
  const [registerDisabled, setRegisterDisabled] = React.useState(false)

  const [firstNameErrorText, setFirstNameErrorText] = React.useState('')
  const [lastNameErrorText, setLastNameErrorText] = React.useState('')
  const [emailErrorText, setEmailErrorText] = React.useState('')
  const [passwordErrorText, setPasswordErrorText] = React.useState('')
  const [reEnteredPasswordErrorText, setReEnteredPasswordErrorText] = React.useState('')

  const classes = useStyles()

  const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

  const handleFieldChange = (type) => (event) => {
    if (type === 'firstName') {
      setFirstName(event.target.value)
    } else if (type === 'lastName') {
      setLastName(event.target.value)
    } else if (type === 'email') {
      setEmail(event.target.value)
    } else if (type === 'password') {
      setPassword(event.target.value)
    } else {
      setReEnteredPassword(event.target.value)
    }
  }


  function validatePassword() {
    if (password === '' || re.test(password)) {
      setPasswordErrorText('')
    } else {
      setPasswordErrorText('Password is not valid')
    }
  }

  React.useEffect(() => {
    validatePassword()
  }, [password])

  async function handleRegister() {
    // TODO: add reCAPTCHA https://github.com/appleboy/react-recaptcha
    if (password !== reEnteredPassword) {
      setReEnteredPasswordErrorText('The passwords you entered don\'t match')
      return
    }

    setRegisterDisabled(true)

    const res = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    })
    const data = await res.json()
    setEmailErrorText('')
    setPasswordErrorText('')
    setFirstNameErrorText('')
    setLastNameErrorText('')
    setReEnteredPasswordErrorText('')

    if (data.message === 'already exists') {
      setEmailErrorText('The email you entered already has an account associated with it')
    }
    if (data.message === 'invalid email') {
      setEmailErrorText('Please enter a valid email')
    }
    setRegisterDisabled(false)
    console.log(data.message)
    if (data.message === 'verification email sent') {
      props.history.push('/verification-sent')
    }
  }

  const disabled = email === '' 
    || password === '' 
    || reEnteredPassword === ''
    || firstName === '' 
    || lastName === '' 
    || registerDisabled 
    || !re.test(password)

  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={handleFieldChange('firstName')}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  value={lastName}
                  onChange={handleFieldChange('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleFieldChange('email')}
                  error={emailErrorText.length > 0}
                  helperText={emailErrorText}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handleFieldChange('password')}
                  error={passwordErrorText.length > 0}
                  helperText={passwordErrorText}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="re-enter-password"
                  label="Re-enter Password"
                  type="password"
                  id="re-enter-password"
                  value={reEnteredPassword}
                  onChange={handleFieldChange('reEnteredPassword')}
                  error={reEnteredPasswordErrorText.length > 0}
                  helperText={reEnteredPasswordErrorText}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='caption' color='textSecondary'>
                Password must contain 8 or more characters with at least 1 upper case letter,
                1 lower case letter, 1 digit and 1 special character.
              </Typography>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleRegister}
              disabled={disabled}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  )
})