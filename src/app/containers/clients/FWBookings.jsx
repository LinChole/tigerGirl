import { connect } from "react-redux"
import Bookings from "../../components/clients/Bookings"
import { submitBooking } from "../../actions/booking"
import { project } from "../../reducers/booking"

const mapStateToProps = (state) => ({
  ...state.projectConfirm,
  project: state.project,
  subproject: state.subproject,
  projectDateTime: state.projectDateTime
})

export default connect(mapStateToProps, {
  submitBooking
})(Bookings)