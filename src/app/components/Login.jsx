import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Paper
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center"
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.2),
    fontSize: "1rem",
    borderRadius: 8
  },
  title: {
    fontWeight: 600,
    marginBottom: theme.spacing(1)
  }
}));

function Login(props) {
  const classes = useStyles()
  const { login } = props

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    login({
      email: data.get("email"),
      password: data.get("password")
    })
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.title}>系統登入</Typography>
            <Typography variant="body2" color="textSecondary">請輸入您的帳號與密碼</Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* #region 記住我，如何記住*/}
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="記住我"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                登 入
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* #region 忘記密碼頁面 */}
                  <Link to="#" variant="body2">
                    忘記密碼？
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/Register" variant="body2">
                    {"還沒有帳號？ 註冊"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
