import React from 'react'
import { Box } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Link } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

import Navbar from '../generic-components/Navbar'
import Copyright from '../generic-components/Copyright'

const useStyles = makeStyles({
  confirmationText: {
    // paddingTop: 20
  }
})

export default function VerificationSendPage() {

  const classes = useStyles()

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
            Verification email sent! Please check your inbox.
          </Typography>
        </Box>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  )
}