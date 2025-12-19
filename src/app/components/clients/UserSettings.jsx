import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Avatar,
  Divider
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Loading from "../statics/Loading"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  },
  avatar: {
    width: 80,
    height: 80,
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    fontSize: 32,
  },
  actions: {
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(2),
  },
  icon: {
    fontSize: '6rem'
  }
}));

export default function UserSettings(props) {
  const classes = useStyles();
  const {
    fetching, items, error, pfetching,
    getMe, chgUserInfo, updateUserInfo,
    openConfirm
  } = props

  useEffect(() => {
    getMe()
  }, [])

  if (fetching || error) return fetching ? <Loading full /> : error
  if (pfetching || error) return pfetching ? <Loading full /> : error
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        個人基本資料
      </Typography>

      <Paper className={classes.paper}>
        <Grid container direction="column" alignItems="center">
          <Avatar className={classes.avatar}><AccountCircleIcon className={classes.icon} /></Avatar>
          <Typography variant="h6">{items.Name}</Typography>
        </Grid>

        <Divider style={{ margin: "24px 0" }} />
        <form onSubmit={(e) => {
          // 不要做預設動作
          e.preventDefault()
          openConfirm('確定要送出了嗎？', () => updateUserInfo())
        }}
          onKeyPress={(e) => {
            e.charCode === 13 && e.preventDefault()
          }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="姓名"
                name="Name"
                value={items.Name}
                onChange={e => chgUserInfo(e.target.name, e.target.value)}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="手機號碼"
                name="Phone"
                value={items.Phone}
                onChange={e => chgUserInfo(e.target.name, e.target.value)}
                fullWidth
                disabled
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="Email"
                value={items.Email}
                onChange={e => chgUserInfo(e.target.name, e.target.value)}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="生日"
                name="Birthday"
                type="date"
                value={items.Birthday}
                onChange={e => chgUserInfo(e.target.name, e.target.value)}
                fullWidth
                variant="outlined"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="備註 / 偏好"
                name="Note"
                value={items.Note}
                onChange={e => chgUserInfo(e.target.name, e.target.value)}
                fullWidth
                variant="outlined"
                multiline
                minRows={3}
              />
            </Grid>
          </Grid>

          <div className={classes.actions}>
            <Button variant="contained" color="primary" type="submit">
              儲存變更
            </Button>
          </div>
        </form>
      </Paper>
    </Container >
  );
}
