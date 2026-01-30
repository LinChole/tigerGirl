import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Typography,
  Grid,
  Box,
  Chip
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";


const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    fontWeight: 600,
    color: "#5998CA",
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    color: "#7C84A4",
    marginBottom: theme.spacing(3),
  },
  timeButton: {
    margin: theme.spacing(1),
    borderRadius: 20,
    padding: theme.spacing(1.2, 3.5),
    fontWeight: 500,
    transition: "all 0.3s ease",
    border: "2px solid #97BCEE",
    color: "#5998CA",
    background: "transparent",
    minWidth: 120,
    boxShadow: "0 2px 8px rgba(89, 152, 202, 0.1)",
    "&:hover": {
      background: "rgba(89, 152, 202, 0.1)",
      borderColor: "#5998CA",
      boxShadow: "0 4px 12px rgba(89, 152, 202, 0.2)",
    },
  },
  timeButtonSelected: {
    margin: theme.spacing(1),
    borderRadius: 20,
    padding: theme.spacing(1.2, 3.5),
    fontWeight: 500,
    transition: "all 0.3s ease",
    background: "linear-gradient(135deg, #5998CA 0%, #7C84A4 50%, #CD75CE 100%)",
    backgroundSize: "200% 200%",
    color: "#fff",
    border: "2px solid transparent",
    minWidth: 120,
    boxShadow: "0 4px 15px rgba(89, 152, 202, 0.3)",
    "&:hover": {
      backgroundPosition: "100% 0",
      boxShadow: "0 6px 20px rgba(205, 117, 206, 0.4)",
    },
  },
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

  return (
    <Box mt={2}>
      <Typography variant="h5" className={classes.sectionTitle}>
        選擇預約時間
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        <AccessTimeIcon style={{ fontSize: 18, verticalAlign: "middle", marginRight: 8 }} />
        請選擇您方便的時段
      </Typography>
      <Grid container>
        {items.map((d, i) => (
          <Grid item key={i}>
            <Button
              variant={d.selected ? "contained" : "outlined"}
              className={d.selected ? classes.timeButtonSelected : classes.timeButton}
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