import React from "react"
import { withRouter, useHistory, useLocation } from "react-router-dom"
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
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div onClick={open ? closeProfile : null} style={isLoginPage ? { width: '100%' } : {}}>
      {/* 限定角色入口 */}
      <ProvideAuth role={roleFromCookie}>
        <Routes />
      </ProvideAuth>
    </div>
  );
};

export default withRouter(Main);
