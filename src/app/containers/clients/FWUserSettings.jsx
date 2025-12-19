import { connect } from "react-redux"
import UserSettings from "../../components/clients/UserSettings"
import { getMe, chgUserInfo, updateUserInfo } from "../../actions/me"
import { openConfirm } from "../../actions/setting"


const mapStateToProps = (state) => ({
  ...state.me
})

export default connect(mapStateToProps, {
  getMe, chgUserInfo, updateUserInfo,
  openConfirm
})(UserSettings)