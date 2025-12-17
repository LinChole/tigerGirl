import { connect } from "react-redux";
import { closeSidebarVisibility } from "../actions/setting";
import Sidebar from "../components/Sidebar";
import { resizeWindow } from "../actions/setting";
import { getMe } from "../actions/me";

import menuC from "../json/menu_C.json"
import menuG from "../json/menu_G.json"


const Meun = (role) => {
  switch (role) {
    case 'G':
      return menuG
    case 'C':
      return menuC
    default:
      return []
  }
}

const mapStateToProps = (state) => {

  const { left, docked, ...otherProps } = state.sidebar;
  const menu = Meun(state.me.items.Role)
  return {
    ...state.me,
    anchor: "left",
    open: left,
    docked,
    ...otherProps,
    menu,
  };
};

export default connect(mapStateToProps, {
  closeSidebarVisibility,
  resizeWindow,
  getMe
})(Sidebar);
