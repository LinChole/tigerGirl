import React, { useEffect } from "react";
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { size } from "../library/tools"
import Profile from "../containers/FWProfile"

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "rgba(247, 242, 251, 0.95)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 4px 30px rgba(89, 152, 202, 0.15)",
    width: '100%',
    transition: "all 0.3s ease",
  },
  brand: {
    fontWeight: 700,
    letterSpacing: 1.2,
    fontSize: "1.3rem",
    background: "linear-gradient(135deg, #5998CA 0%, #CD75CE 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.05)",
    }
  },
  spacer: {
    flexGrow: 1,
  },
  navButton: {
    marginLeft: theme.spacing(1),
    borderRadius: 20,
    textTransform: "none",
    fontWeight: 500,
    color: "#7C84A4",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#5998CA",
      background: "rgba(89, 152, 202, 0.1)",
      transform: "translateY(-2px)",
    }
  },
  iconButton: {
    color: "#7C84A4",
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#5998CA",
      transform: "scale(1.1)",
    }
  },
  bookingButton: {
    marginLeft: theme.spacing(2),
    borderRadius: 24,
    padding: theme.spacing(0.8, 3),
    background: "linear-gradient(135deg, #5998CA 0%, #7C84A4 50%, #CD75CE 100%)",
    backgroundSize: "200% 200%",
    color: "#fff",
    fontWeight: 600,
    boxShadow: "0 4px 15px rgba(89, 152, 202, 0.3)",
    transition: "all 0.4s ease",
    '&:hover': {
      backgroundPosition: "100% 0",
      boxShadow: "0 6px 25px rgba(205, 117, 206, 0.4)",
      transform: "translateY(-2px)",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles()
  const {
    fetching, items, error, open,
    getMe, toggleProfile, logout
  } = props

  useEffect(() => {
    getMe()
  }, [])

  return (
    <AppBar position="sticky" className={classes.appBar} elevation={0}>
      <Toolbar>
        {/* Brand */}
        <Typography variant="h6" className={classes.brand}>TigerLady's 老虎小姐</Typography>

        <div className={classes.spacer} />
        {/* Navigation */}
        <Box>
          <Button className={classes.navButton} component={Link} to={`${items.role === 'C' ? '/' : '/admin'}`} >首頁</Button>
          {/* <Button className={classes.navButton} component={Link} to='/'>服務項目</Button> */}
          {/* <Button className={classes.navButton} component={Link} to='/login'>作品集</Button> */}
          {items.name ? (
            <>
              {items.role === 'C' && (
                <>
                  <Button className={classes.navButton} component={Link} to='/schedule'>我的預約</Button>
                  <Button className={classes.navButton} component={Link} to='/settings'>會員中心</Button>
                </>)
              }
              <Button className={classes.navButton} onClick={logout} color='primary'>登出</Button>
            </>
          ) : (
            <Button component={Link} to='/login' color='primary'>登入</Button>
          )}
          {/* <Button
            variant="contained"
            className={classes.bookingButton}
          >
            立即預約
          </Button> */}
          {open && <Profile />}
        </Box>
      </Toolbar>
    </AppBar>
  );
}