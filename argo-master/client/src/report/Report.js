import React from "react"
import { AppBar } from "@material-ui/core"
import { BottomNavigation } from "@material-ui/core"
import { BottomNavigationAction } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
// import { Tab } from "@material-ui/core"
// import { Tabs } from "@material-ui/core"
import { Typography } from "@material-ui/core"
// import { withRouter, Route, Switch, Redirect } from "react-router-dom"
import { withRouter } from "react-router-dom"

import Navbar from "../generic-components/Navbar"

const useStyles = makeStyles({
  rootGrid: {
    margin: "0px",
    width: "100%",
    justifyContent: "space-around"
  },
  traitGrid: {
    width: "250px",
    height: "300px",
    margin: "20px",
    transition: "transform 300ms",
    "&:hover": {
      transform: "translate(0px, -20px)"
    }
  },
  bottomAppBar: {
    top: "auto",
    bottom: 0
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    width: "inherit"
  }
})

export default withRouter(function Report(props) {
  /* Component that displays user's genotype report
  */

  const [category, setCategory] = React.useState(0)
  const classes = useStyles()

  function handleAppBarChange(event, newValue) {
    if (newValue === category) {
      return
    }
    setCategory(newValue)
    window.scrollTo(0, 0)  // resets scroll to top of page
  }

  return (
    <React.Fragment>
      <Navbar />
      <Traits category={category} categoryNum={0} nTraits={10} history={props.history}/>
      <Traits category={category} categoryNum={1} nTraits={5} history={props.history}/>
      <Traits category={category} categoryNum={2} nTraits={6} history={props.history}/>
      <AppBar position="fixed" color="primary" className={classes.bottomAppBar}>
        <BottomNavigation
          value={category}
          onChange={handleAppBarChange}
          // className={classes.bottomNav}
          showLabels
          // centered
        >
          <BottomNavigationAction label="Category 1" />
          <BottomNavigationAction label="Category 2" />
          <BottomNavigationAction label="Category 3" />
        </BottomNavigation>
      </AppBar>
    </React.Fragment>
  )
})

function Traits(props) {

  const classes = useStyles()
  
  const handleTraitClick = (element) => () => {
    props.history.push(`/report/trait?category=${props.category}&id=${element}`)
  }

  return (
    <Grid
    className={classes.rootGrid}
    container
    style={{
      "display": props.category === props.categoryNum ?
        "flex" :
        "none"
    }}
  >
    {
      [...Array(props.nTraits).keys()].map((el, index) => {
        return (
          <Grid
            key={el}
            className={classes.traitGrid}
            direction="column"
            justify="center"
            alignItems="center"
            container
            onClick={handleTraitClick(el)}
          >
            <Grid item>
              <Typography>
                {`Category ${props.categoryNum + 1} Trait ${index + 1}`}
              </Typography>
            </Grid>
            <Grid item>
              <img
                src="/isometric-trait-base.svg"
                width="100%"
                height="100%"
                alt="Trait"
              />
            </Grid>
            <Typography>
                Some dopeass info
            </Typography>
          </Grid>
        )
      })
    }
  </Grid>
  )
}