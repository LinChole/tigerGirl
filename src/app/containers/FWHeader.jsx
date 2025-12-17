import { connect } from "react-redux";
import { toggleSidebarVisibility } from "../actions/setting";
import { getMe,toggleProfile } from "../actions/me";
import Header from "../components/Header";

const mapStateToProps = (state, ownProps) => {
  //mapStateToProps回傳值，作為state傳遞給Header組件
  return {
    ...state.sidebar,
    ...state.me,
  };
};

export default connect(mapStateToProps, {
  toggleSidebarVisibility,
  getMe,
  toggleProfile,
})(Header);
