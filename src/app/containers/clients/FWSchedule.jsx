import { connect } from "react-redux"
import Schedule from "../../components/clients/Schedule"
import { getSchedule } from "../../actions/schedule"


const mapStateToProps = (state) => ({
    ...state.schedule
})

export default connect(mapStateToProps, {
    getSchedule
})(Schedule)