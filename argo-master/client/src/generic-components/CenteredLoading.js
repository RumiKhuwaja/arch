import React from "react"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { CircularProgress } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    backgroundColor: "#ebf8ff",
    overflowY: "hidden",
    overflowX: "hidden"
  }
})

export default function CenteredLoading() {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        align="center"
        height="inherit"
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </div>
  )
}