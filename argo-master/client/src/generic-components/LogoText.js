import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { ButtonBase } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

const styles = {
  logo: {
    position: 'absolute', 
    marginLeft: '20px',
    marginTop: '0px'
  }
}

const LogoText = withRouter(function (props) {

  // const classes = useStyles()
  const { classes } = props

  function handleLogoClick() {
    props.history.push('/')
  }

  return (
    <ButtonBase 
      className={classes.logo} 
      onClick={handleLogoClick}
      disableRipple
    >
      <Typography variant="h3">
        <Box fontFamily="Tomorrow, sans-serif">
          argo
        </Box>
      </Typography>
    </ButtonBase>
  )
})

LogoText.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LogoText)