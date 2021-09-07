import React from "react"
import { Card } from "@material-ui/core"
import { CardContent } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"

import queryString from "query-string"
import { withRouter, Redirect } from "react-router-dom"

import Navbar from "../generic-components/Navbar"

const useStyles = makeStyles({
  titleGrid: {
    marginTop: "30px"
  },
  rootGrid: {
    display: "grid",
    gridGap: "15px",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    // gridTemplateColumns: "fit-content(50%) fit-content(50%)",
    // gridTemplateRows: "minmax(auto, max-content)",
    // gridAutoRows: "200px",
    gridAutoFlow: "dense"
  },
  wideGrid: {
    gridColumn: "span 2"
  },
  tallGrid: {
    gridRow: "span 2"
  },
  traitImage: {
    // position: "absolute"
  },
  description: {
    textAlign: "center"
  }
})

export default withRouter(function TraitBase(props) {

  const classes = useStyles()

  // Redirect to 404 if no query string provided
  if (!props.location.search) {
    return <Redirect to='/404' />
  }
  const queryValues = queryString.parse(props.location.search)

  return (
    <React.Fragment>
      <Navbar />
      <Grid
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.titleGrid}
        container
      >

        <Typography variant="h3">
          Trait: {parseInt(queryValues.id) + 1}, Category: {parseInt(queryValues.category) + 1}
        </Typography>
        <img
          className={classes.traitImage}
          src="/isometric-trait-base.svg"
          width="25%"
          height="25%"
          alt="Trait"
        />

        <Grid item xs={6}>
          <Typography
            className={classes.description}
            variant="body1"
          >
            Description of trait and lots of text and stuff and it goes on and on and on and on and on and on and on
          </Typography>
        </Grid>
      </Grid>

      <div
        className={classes.rootGrid}
      >
        <Card className={classes.tallGrid}>
          <CardContent>
            <Typography>
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography>
              test text
              test text
              test text
              test text
              test text
              test text
              test text
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.wideGrid}>
          <CardContent>
            <Typography>
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
              test text
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography>
              test text
              test text
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography>
              test text
              test text
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography>
              test text
              test text
            </Typography>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  )
})