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
  Divider,
  Box
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#F7F2FB",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(4),
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  paper: {
    padding: theme.spacing(5),
    borderRadius: 24,
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 20px 60px rgba(89, 152, 202, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    transition: "all 0.3s ease",
  },
  avatarContainer: {
    marginBottom: theme.spacing(3),
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: theme.spacing(2),
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    boxShadow: "0 8px 20px rgba(89, 152, 202, 0.4)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 12px 30px rgba(205, 117, 206, 0.5)",
    },
  },
  icon: {
    fontSize: '3.5rem',
    color: "#fff",
  },
  userName: {
    fontWeight: 600,
    color: "#5998CA",
  },
  divider: {
    margin: theme.spacing(3, 0),
    background: "linear-gradient(90deg, transparent, #97BCEE, transparent)",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      background: "rgba(255, 255, 255, 0.8)",
      transition: "all 0.3s ease",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.95)",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#97BCEE",
        },
      },
      "&.Mui-focused": {
        background: "rgba(255, 255, 255, 1)",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#5998CA",
          borderWidth: 2,
        },
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#5998CA",
    },
  },
  actions: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(2),
  },
  submitButton: {
    padding: theme.spacing(1.5, 5),
    borderRadius: 30,
    fontSize: "1rem",
    fontWeight: 600,
    background: "linear-gradient(135deg, #5998CA 0%, #7C84A4 50%, #CD75CE 100%)",
    backgroundSize: "200% 200%",
    color: "#fff",
    boxShadow: "0 8px 20px rgba(89, 152, 202, 0.4)",
    transition: "all 0.4s ease",
    "&:hover": {
      backgroundPosition: "100% 0",
      boxShadow: "0 12px 30px rgba(205, 117, 206, 0.5)",
      transform: "translateY(-2px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
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

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h3" className={classes.title}>
          個人基本資料
        </Typography>

        <Paper className={classes.paper} elevation={0}>
          <Grid container direction="column" alignItems="center" className={classes.avatarContainer}>
            <Avatar className={classes.avatar}>
              <AccountCircleIcon className={classes.icon} />
            </Avatar>
            <Typography variant="h5" className={classes.userName}>
              {items.Name}
            </Typography>
          </Grid>

          <Divider className={classes.divider} />

          <form onSubmit={(e) => {
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
                  className={classes.textField}
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
                  className={classes.textField}
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
                  className={classes.textField}
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
                  className={classes.textField}
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
                  className={classes.textField}
                />
              </Grid>
            </Grid>

            <div className={classes.actions}>
              <Button
                variant="contained"
                type="submit"
                className={classes.submitButton}
              >
                儲存變更
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
