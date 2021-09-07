import React from "react"
import PropTypes from "prop-types"
import { AppBar } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import { Tab } from "@material-ui/core"
import { Tabs } from "@material-ui/core"
import { Typography } from "@material-ui/core"

import LogoText from "./LogoText"

const styles = {
  navbar: {
    height: "60px",
    "& div": {
      height: "inherit"
    },
  }
}

function Navbar(props) {

  const { classes } = props

  return (
    <React.Fragment>
      <AppBar
        position="static"
        className={classes.navbar}
        color="default"
      >
        <LogoText />
        {/* <Tabs
          // value={category}
          // onChange={handleAppBarChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Home" />
          <Tab label="Report" />
        </Tabs> */}
      </AppBar>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar)