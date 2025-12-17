import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { headerBackground } from "Config";
import { size } from "../library/tools";
import Profile from "../containers/FWProfile";
import Banner from "./statics/Banner";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
//   },
//   toolbarTitle: {
//     flexGrow: 1,
//     fontWeight: 600,
//   },
//   button: {
//     marginLeft: theme.spacing(2),
//   },
// }));


function Header(props) {
  const classes = useStyles();
  const {
    left,
    docked,
    title,
    open,
    items,
    toggleSidebarVisibility,
    toggleProfile,
  } = props;

  return (
    <AppBar position="fixed" className={`${classes.appBar} ${headerBackground}`}>
      <Banner />
      {/* <Toolbar variant={!docked ? 'dense' : 'regular'}> */}
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => toggleSidebarVisibility("left")}
        >
          {left ? <ChevronLeft /> : <Menu />}
        </IconButton>
        <Typography variant="h6" className={`${classes.title}`}>
          {title || ''}
        </Typography>
        {!!size(items)(
          <div>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="account of current user"
              onClick={toggleProfile}
            >
              <AccountCircle />
            </IconButton>
            {open && <Profile />}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  left: PropTypes.bool.isRequired,
  right: PropTypes.bool.isRequired,
  docked: PropTypes.bool.isRequired,
  title: PropTypes.string,
  open: PropTypes.bool,
  items: PropTypes.object,
  toggleSidebarVisibility: PropTypes.func.isRequired,
  toggleProfile: PropTypes.func.isRequired,
};

export default Header;
