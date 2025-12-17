import { connect } from 'react-redux'
import { closeSnackbar } from '../actions'
import Snackbar from '../components/Snackbar'

const mapStateToProps = (state) => {
  return {
    ...state.snackbar
  }
}

export default connect(mapStateToProps, {
  closeSnackbar
})(Snackbar)
