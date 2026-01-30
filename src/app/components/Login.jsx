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
  Paper,
  InputAdornment,
  IconButton
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import EmailIcon from "@material-ui/icons/Email"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #5998CA 0%, #97BCEE 50%, #CD75CE 100%)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "500px",
      height: "500px",
      background: "radial-gradient(circle, rgba(151, 188, 238, 0.3) 0%, transparent 70%)",
      top: "-100px",
      left: "-100px",
      animation: "$float 6s ease-in-out infinite"
    },
    "&::after": {
      content: '""',
      position: "absolute",
      width: "400px",
      height: "400px",
      background: "radial-gradient(circle, rgba(205, 117, 206, 0.3) 0%, transparent 70%)",
      bottom: "-100px",
      right: "-100px",
      animation: "$float 8s ease-in-out infinite reverse"
    }
  },
  "@keyframes float": {
    "0%, 100%": {
      transform: "translate(0, 0)"
    },
    "50%": {
      transform: "translate(30px, 30px)"
    }
  },
  "@keyframes slideIn": {
    from: {
      opacity: 0,
      transform: "translateY(30px)"
    },
    to: {
      opacity: 1,
      transform: "translateY(0)"
    }
  },
  container: {
    position: "relative",
    zIndex: 1,
    animation: "$slideIn 0.6s ease-out"
  },
  paper: {
    padding: theme.spacing(5),
    borderRadius: 24,
    background: "rgba(247, 242, 251, 0.95)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 20px 60px rgba(89, 152, 202, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 25px 70px rgba(89, 152, 202, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.6)",
      transform: "translateY(-5px)"
    }
  },
  avatar: {
    margin: theme.spacing(1),
    width: 70,
    height: 70,
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    boxShadow: "0 8px 20px rgba(89, 152, 202, 0.4)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "rotate(360deg) scale(1.1)",
      boxShadow: "0 12px 30px rgba(205, 117, 206, 0.5)"
    }
  },
  avatarIcon: {
    fontSize: 35
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      background: "rgba(255, 255, 255, 0.8)",
      transition: "all 0.3s ease",
      "&:hover": {
        background: "rgba(255, 255, 255, 0.95)",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#97BCEE"
        }
      },
      "&.Mui-focused": {
        background: "rgba(255, 255, 255, 1)",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#5998CA",
          borderWidth: 2
        }
      }
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#5998CA"
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5),
    fontSize: "1.1rem",
    fontWeight: 600,
    borderRadius: 12,
    background: "linear-gradient(135deg, #5998CA 0%, #7C84A4 50%, #CD75CE 100%)",
    backgroundSize: "200% 200%",
    color: "#fff",
    textTransform: "none",
    boxShadow: "0 8px 20px rgba(89, 152, 202, 0.4)",
    transition: "all 0.4s ease",
    "&:hover": {
      backgroundPosition: "100% 0",
      boxShadow: "0 12px 30px rgba(205, 117, 206, 0.5)",
      transform: "translateY(-2px)"
    },
    "&:active": {
      transform: "translateY(0)"
    }
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  },
  subtitle: {
    color: "#7C84A4",
    marginBottom: theme.spacing(2),
    fontWeight: 500
  },
  link: {
    color: "#5998CA",
    textDecoration: "none",
    fontWeight: 500,
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#CD75CE",
      textDecoration: "underline"
    }
  },
  divider: {
    margin: theme.spacing(3, 0),
    position: "relative",
    textAlign: "center",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: 0,
      right: 0,
      height: "1px",
      background: "linear-gradient(90deg, transparent, #97BCEE, transparent)"
    }
  },
  dividerText: {
    position: "relative",
    display: "inline-block",
    padding: "0 16px",
    background: "rgba(247, 242, 251, 0.95)",
    color: "#7C84A4",
    fontSize: "0.875rem"
  }
}));

function Login(props) {
  const classes = useStyles()
  const { login } = props
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    login({
      email: data.get("email"),
      password: data.get("password")
    })
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Paper className={classes.paper} elevation={0}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon className={classes.avatarIcon} />
            </Avatar>
            <Typography component="h1" variant="h4" className={classes.title}>
              歡迎回來
            </Typography>
            <Typography variant="body1" className={classes.subtitle}>
              請輸入您的帳號與密碼
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                className={classes.textField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="電子郵件"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon style={{ color: "#7C84A4" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="密碼"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon style={{ color: "#7C84A4" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <Visibility style={{ color: "#7C84A4" }} /> : <VisibilityOff style={{ color: "#7C84A4" }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                登 入
              </Button>
              <Grid container spacing={2} style={{ marginTop: 8 }}>
                <Grid item xs={12} sm={6}>
                  <Link to="#" className={classes.link}>
                    忘記密碼？
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
                  <Link to="/Register" className={classes.link}>
                    註冊新帳號
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
