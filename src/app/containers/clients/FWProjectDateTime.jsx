import { connect } from "react-redux"
import ProjectDateTime from "../../components/clients/ProjectDateTime"
import {
  getProjectDateTime, getAvailableTimes, selectDateTime
} from "../../actions/booking"



const mapStateToProps = (state) => ({
  ...state.projectDateTime,
})

export default connect(mapStateToProps, {
  getProjectDateTime, getAvailableTimes, selectDateTime
})(ProjectDateTime)