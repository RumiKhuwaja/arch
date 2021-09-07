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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default withRouter(function SignInPage(props) {
  const classes = useStyles()

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [emailErrorText, setEmailErrorText] = React.useState("")
  const [passwordErrorText, setPasswordErrorText] = React.useState("")
  const [signInDisabled, setSignInDisabled] = React.useState(false)

  function handleEmailChange(event) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  async function handleSignIn() {
    setSignInDisabled(true)

    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const data = await res.json()
    
    setEmailErrorText('')
    setPasswordErrorText('')

    if (res.status !== 200) {
      if (data.message === 'email' || data.message === 'not valid email') {
        setEmailErrorText('The email you entered does not exist')
      }
      if (data.message === 'password') {
        setPasswordErrorText('The password you entered is incorrect')
      }
      if (data.message === 'not verified') {
        setEmailErrorText('Your account has not been verified')
      }
      setSignInDisabled(false)
    } else {
      props.history.push('/report')
    }
  }

  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              error={emailErrorText.length > 0}
              helperText={emailErrorText}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              error={passwordErrorText.length > 0}
              helperText={passwordErrorText}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={signInDisabled}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  )
})