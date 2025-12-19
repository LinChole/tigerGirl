import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Typography,
  Grid,
  Box
} from "@material-ui/core";
import Loading from '../statics/Loading'


const useStyles = makeStyles((theme) => ({
  timeButton: {
    margin: theme.spacing(1),
  }
}));


export default function ProjectDateTime(props) {
  const classes = useStyles()
  const {
    fetching, items, error, pfetching,
    getProjectDateTime, selectDateTime
  } = props

  useEffect(() => {
    getProjectDateTime()
  }, [])

  if (fetching || error) return fetching ? <Loading full /> : error
  if (pfetching || error) return pfetching ? <Loading full /> : error
  return (
    <Box mt={4}>
      <Typography variant="subtitle1" gutterBottom>請選擇可預約的時間：</Typography>
      <Grid container>
        {items.map((d, i) => (
          <Grid item key={i}>
            <Button
              variant={d.selected ? "contained" : "outlined"}
              color="primary"
              className={classes.timeButton}
              onClick={() => selectDateTime(d.id)}
            >
              {d.dateTime}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}