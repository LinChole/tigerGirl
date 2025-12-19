import { connect } from "react-redux";
import App from "../components/App";
import { resizeWindow } from "../actions/setting";



const mapStateToProps = (state) => {
  const { left, right, docked } = state.sidebar;
  return {
    left, right, docked
  };
};

export default connect(mapStateToProps, {
  resizeWindow
})(App);
