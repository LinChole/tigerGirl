import { connect } from "react-redux";
import Header from "../components/Header";
import { getMe, toggleProfile } from "../actions/me";

const mapStateToProps = (state, ownProps) => {
  //mapStateToProps回傳值，作為state傳遞給Header組件
  return {
    ...state.me,
  };
};

export default connect(mapStateToProps, {
  getMe, toggleProfile
})(Header);
