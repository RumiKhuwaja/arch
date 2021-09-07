import React from 'react'
import { Box } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Link } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

import Navbar from '../generic-components/Navbar'
import CenteredLoading from '../generic-components/CenteredLoading'
import Copyright from '../generic-components/Copyright'

const useStyles = makeStyles({
  confirmationText: {
    // paddingTop: 20
  }
})

export default withRouter(function ConfirmationPage(props) {
  
  const [loading, setLoading] = React.useState(true)
  const [confirmationText, setConfirmationText] = React.useState('')
  const [showSignIn, setShowSignIn] = React.useState(false)
  const [showResend, setShowResend] = React.useState(false)
  const classes = useStyles()

  console.log(props.match.params.token)
  console.log(props.match.params.email)

  async function onResendClick(event) {
    event.preventDefault()
    setShowResend(false)
    const res = await fetch(`/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: props.match.params.email
      })
    })
    const data = await res.json()
    if (data.message === 'verification email sent') {
      props.history.push('/verification-sent')
    } else {
      setConfirmationText('We\'ve experienced an error, please try again later.')
    }
  }

  React.useEffect(() => {
    async function sendToken() {
      const res = await fetch('/confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          token: props.match.params.token
        })
      })
      const data = await res.json()
      
      if (data.message === 'not verified') {
        setConfirmationText('Verification was unsuccessful. Your verification token may be invalid or out of date.')
        setShowResend(true)
      }

      if (data.message === 'user does not exist') {
        setConfirmationText('The user you are trying to verify does not exist.')
      }

      if (data.message === 'user already verified') {
        setConfirmationText('You\'re account has already been verified. Click below to sign in.')
        setShowSignIn(true)
      }

      if (data.message === 'verified successfully') {
        setConfirmationText('You\'ve been verified! Click on the link below to sign in.')
        setShowSignIn(true)
      }

      setLoading(false)
    }
    sendToken()
  }, [])
  
  if (loading) {
    return (
      <CenteredLoading />
    )
  }

  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <Box mt={8}>
          <Typography 
            className={classes.confirmationText}
            variant="h5"
            gutterBottom
          >
            {confirmationText}
          </Typography>
        </Box>
        <Grid container justify="flex-start">
          <Grid item>
            <Box display={showSignIn ? 'inline' : 'none'}>
              <Link 
                href="/signin"
                variant="body2"
              >
                Click here to sign in
              </Link>
            </Box>
          </Grid>
          <Grid item>
            <Box display={showResend ? 'inline' : 'none'}>
              <Link 
                component="button"
                onClick={onResendClick} 
                variant="body2"
              >
                Click here to resend verification email
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  )
})