import { connect } from 'react-redux'
import { closeConfirm, agreeConfirm } from '../actions/setting'
import Confirm from '../components/Confirm'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.confirm
  }
}

export default connect(mapStateToProps, {
  closeConfirm,
  agreeConfirm
})(Confirm)
