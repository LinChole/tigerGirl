import { connect } from "react-redux"
import Bookings from "../../components/clients/Bookings"
import { submitBooking } from "../../actions/booking"

const mapStateToProps = (state) => ({
  ...state.projectConfirm
})

export default connect(mapStateToProps, {
  submitBooking
})(Bookings)