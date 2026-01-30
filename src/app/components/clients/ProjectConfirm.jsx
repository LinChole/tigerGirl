import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Typography, Box, Divider, Grid } from "@material-ui/core"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import EventIcon from "@material-ui/icons/Event";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CategoryIcon from "@material-ui/icons/Category";

const useStyles = makeStyles((theme) => ({
  confirmPaper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
    borderRadius: 24,
    background: "linear-gradient(135deg, rgba(247, 242, 251, 0.95) 0%, rgba(151, 188, 238, 0.1) 100%)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 20px 60px rgba(89, 152, 202, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: 12,
    background: "rgba(255, 255, 255, 0.6)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.9)",
      transform: "translateX(5px)",
    },
  },
  icon: {
    color: "#5998CA",
    marginRight: theme.spacing(2),
  },
  label: {
    fontWeight: 600,
    color: "#7C84A4",
    marginRight: theme.spacing(1),
  },
  value: {
    color: "#5998CA",
    fontWeight: 500,
  },
  priceValue: {
    color: "#CD75CE",
    fontWeight: 700,
    fontSize: "1.2rem",
  },
  divider: {
    margin: theme.spacing(3, 0),
    background: "linear-gradient(90deg, transparent, #97BCEE, transparent)",
  },
}))


export default function ProjectConfirm(props) {
  const classes = useStyles()
  const {
    fetching, items, error, pfetching,
    getProjectConfirm
  } = props

  useEffect(() => {
    getProjectConfirm()
  }, [])

  return (
    <Paper className={classes.confirmPaper} elevation={0}>
      <Typography variant="h5" className={classes.title}>
        <CheckCircleOutlineIcon />
        確認您的預約內容
      </Typography>

      <Divider className={classes.divider} />

      <Box className={classes.infoRow}>
        <CategoryIcon className={classes.icon} />
        <Typography className={classes.label}>服務項目：</Typography>
        <Typography className={classes.value}>{items?.name}</Typography>
      </Box>

      {items?.cname && (
        <Box className={classes.infoRow}>
          <CategoryIcon className={classes.icon} />
          <Typography className={classes.label}>服務內容：</Typography>
          <Typography className={classes.value}>{items?.cname}</Typography>
        </Box>
      )}

      <Box className={classes.infoRow}>
        <AttachMoneyIcon className={classes.icon} />
        <Typography className={classes.label}>價格：</Typography>
        <Typography className={classes.priceValue}>NT$ {items?.price}</Typography>
      </Box>

      <Box className={classes.infoRow}>
        <EventIcon className={classes.icon} />
        <Typography className={classes.label}>預約時間：</Typography>
        <Typography className={classes.value}>{items?.dateTime}</Typography>
      </Box>
    </Paper>
  )
}