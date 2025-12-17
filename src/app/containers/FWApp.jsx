import { connect } from "react-redux";
import { resizeWindow } from "../actions/setting";
import App from "../components/App";



const mapStateToProps = (state) => {
  const { left, right, docked } = state.sidebar;
  return {
    left, right, docked
  };
};

export default connect(mapStateToProps, {
  resizeWindow,
})(App);
