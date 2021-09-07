import React from "react"

import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  error404: {
    position: "absolute",
    display: "flex",
    flex: 1,
    height: "inherit",
    width: "inherit"
  }
})

export default function GenericNotFound() {
  const classes = useStyles()
  return (
    <div className={classes.error404}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h1">
            404
          </Typography>
        </Grid>

        <Grid item>
          <Box
            fontStyle="italic"
            m={1}
            textAlign="center"
          >
            <Typography variant="body2">
              I'm sorry Dave, I'm afraid I can't do that.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}