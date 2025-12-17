import { connect } from "react-redux";

import Login from "../components/Login";
import { login } from "../actions/sign"

const mapStateToProps = (state, ownProps) => {
  return {

  }
};

export default connect(mapStateToProps, {
  login
})(Login);
