import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Typography } from "@material-ui/core"
import Loading from '../statics/Loading'

const useStyles = makeStyles((theme) => ({
  confirmPaper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
  }
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

  if (fetching || error) return fetching ? <Loading full /> : error
  if (pfetching || error) return pfetching ? <Loading full /> : error
  return (
    <Paper className={classes.confirmPaper} elevation={3}>
      <Typography variant="h6" gutterBottom>確認您的預約內容</Typography>
      <Typography variant="body1">
        <strong>服務項目：</strong> {items?.name}
      </Typography>
      {items?.cname && (<Typography variant="body1">
        <strong>服務內容：</strong> {items?.cname}
      </Typography>)}
      <Typography variant="body1">
        <strong>價格：</strong> NT$ {items?.price}
      </Typography>
      <Typography variant="body1">
        <strong>預約時間：</strong> {items?.dateTime}
      </Typography>
    </Paper>
  )
}