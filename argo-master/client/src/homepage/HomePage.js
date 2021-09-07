import React from 'react'
import { Box } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Fade } from '@material-ui/core'
import { Slide } from '@material-ui/core'
import { useMediaQuery } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import Navbar from '../generic-components/Navbar'
import Copyright from '../generic-components/Copyright'

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    backgroundColor: '#ebf8ff',
    overflowY: 'hidden',
    overflowX: 'hidden'
  },
  tagline: {
    display: 'inline',
    position: 'absolute',
    width: '20%',
    right: '20%',
    top: '30%',
    zIndex: 1,
    // marginRight: '20px'
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '-25px',
      left: '-25px',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      zIndex: -1
    },
  },
  navbar: {
    position: 'absolute'
  }
})


export default withRouter(function HomePage(props) {

  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))

  function handleRegistrationClick() {
    props.history.push('/register')
  }

  function handleReportClick() {
    // props.history.push('/signin')
    props.history.push('/report')
  }

  return (
    <div className={classes.root}>
      <Navbar classes={{ navbar: classes.navbar }} />
      <Grid
        container
        direction="column"
        justify="center"
        align="center"
        height="inherit"
      >
        <Grid item>
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={1000}
          >
            <img
              src="isometric-dna.svg"
              width="70%"
              height="70%"
              alt="DNA"
            />
          </Slide>
        </Grid>
        <Grid item style={{ width: 'inherit' }}>
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={800}
            style={{ transitionDelay: "500ms" }}
          >
            <Button
              variant="text"
              style={{ marginRight: matches ? "0px" : "40px" }}
              onClick={handleRegistrationClick}
            >
              Let's get started
            </Button>
          </Slide>
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={800}
            style={{ transitionDelay: "700ms" }}
          >
            <Button
              variant="text"
              onClick={handleReportClick}
            >
              View my report
            </Button>
          </Slide>
          <Fade 
            in={true} 
            timeout={1000}
            style={{ transitionDelay: "900ms" }}
          >
            <Box mt={8}>
              <Copyright />
            </Box>
          </Fade>
        </Grid>
      </Grid>
      <Fade in={true} timeout={2500}>
        <Typography
          variant="h4"
          className={classes.tagline}
          style={{ display: matches ? "none" : "inline" }}
        >
          <Box
            fontFamily="Raleway, sans-serif"
          // fontStyle="italic"
          // fontWeight="fontWeightBold"
          >
            Super dopeass tagline to get people excited
            </Box>
        </Typography>
      </Fade>
    </div>
  )
})