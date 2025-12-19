import { connect } from "react-redux"
import ProjectConfirm from "../../components/clients/ProjectConfirm"
import { getProjectConfirm } from "../../actions/booking"

const mapStateToProps = (state) => ({
  ...state.projectConfirm
})

export default connect(mapStateToProps, {
  getProjectConfirm
})(ProjectConfirm)