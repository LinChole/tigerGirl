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
import Loading from "./statics/Loading"
import Profile from "../containers/FWProfile"

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    width: '100%'
  },
  brand: {
    fontWeight: 700,
    letterSpacing: 1,
    color: "#e91e63",
  },
  spacer: {
    flexGrow: 1,
  },
  navButton: {
    marginLeft: theme.spacing(1),
    borderRadius: 20,
    textTransform: "none",
    fontWeight: 500,
  },
  bookingButton: {
    marginLeft: theme.spacing(2),
    borderRadius: 24,
    padding: theme.spacing(0.8, 3),
    background: "linear-gradient(135deg, #f48fb1, #f06292)",
    color: "#fff",
    '&:hover': {
      background: "linear-gradient(135deg, #f06292, #ec407a)",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles()
  const {
    fetching, items, error, open,
    getMe, toggleProfile
  } = props

  useEffect(() => {
    getMe()
  }, [])


  if (fetching || error) return fetching ? <Loading full /> : error
  if (!size(items)) return '無資料'
  return (
    <AppBar position="sticky" className={classes.appBar} elevation={0}>
      <Toolbar>
        {/* Brand */}
        <Typography variant="h6" className={classes.brand}>TigerLady's 老虎小姐</Typography>

        <div className={classes.spacer} />
        {/* Navigation */}
        <Box>
          <Button className={classes.navButton} component={Link} to={`${items.Role === 'C' ? '/' : '/admin'}`} >首頁</Button>
          {/* <Button className={classes.navButton} component={Link} to='/'>服務項目</Button> */}
          {/* <Button className={classes.navButton} component={Link} to='/login'>作品集</Button> */}
          {items.Name ? (
            <>
              {items.Role === 'C' && (
                <>
                  <Button className={classes.navButton} component={Link} to='/schedule'>我的預約</Button>
                  <Button className={classes.navButton} component={Link} to='/settings'>會員中心</Button>
                </>)
              }
              <IconButton aria-label={items.Name} color='primary' onClick={toggleProfile}><AccountCircleIcon /></IconButton>
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