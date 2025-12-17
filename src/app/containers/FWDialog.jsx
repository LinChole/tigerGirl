import { connect } from 'react-redux'
import { closeDialog } from '../actions/setting'
import Dialog from '../components/Dialog'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.dialog
  }
}

export default connect(mapStateToProps, {
  closeDialog
})(Dialog)
