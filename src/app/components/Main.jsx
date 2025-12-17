import React from "react"
import { withRouter, useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { getCookie } from "../library/cookie"
// import routes from "../routes";
import Routes from "../Routes";
import { ProvideAuth } from "../provideAuth"
import { useAuth } from "../provideAuth";

const useStyles = makeStyles((theme) => ({
  main: {
    // position:"relative",
    marginTop: 200,
    marginBottom: 100,
    minHeight: "100vh",
    padding: "1em",
    [theme.breakpoints.down("sm")]: {
      marginTop: 180,
    },
  }
}));

const Main = (props) => {
  const classes = useStyles();
  const { open, closeProfile } = props;
  const roleFromCookie = getCookie('role')

  return (
    // <div className={classes.main} onClick={open ? closeProfile : null}>
    <div onClick={open ? closeProfile : null}>
      {/* 限定角色入口 */}
      <ProvideAuth role={roleFromCookie}>
        <Routes />
        {/* {routes()} */}
      </ProvideAuth>
    </div>
  );
};

export default withRouter(Main);
