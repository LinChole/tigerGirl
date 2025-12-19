import { connect } from "react-redux"
import ProjectDateTime from "../../components/clients/ProjectDateTime"
import {
  getProjectDateTime, selectDateTime
} from "../../actions/booking"



const mapStateToProps = (state) => ({
  ...state.projectDateTime,
})

export default connect(mapStateToProps, {
  getProjectDateTime, selectDateTime
})(ProjectDateTime)