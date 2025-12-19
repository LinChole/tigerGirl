import { connect } from "react-redux"
import Project from "../../components/clients/Project"
import {
  getProject, getSubproject,
  selectProject, selectSubproject
} from "../../actions/booking"



const mapStateToProps = (state) => ({
  ...state.project,
  subproject: state.subproject
})

export default connect(mapStateToProps, {
  getProject, getSubproject,
  selectProject, selectSubproject
})(Project)