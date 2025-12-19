import { connect } from "react-redux"
import Schedule from "../../components/clients/Schedule"
import { getSchedule, cancelSchedule } from "../../actions/schedule"
import { openConfirm } from "../../actions/setting"


const mapStateToProps = (state) => ({
    ...state.schedule
})

export default connect(mapStateToProps, {
    getSchedule, cancelSchedule,
    openConfirm
})(Schedule)