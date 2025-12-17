import { connect } from 'react-redux';
import Main from '../components/Main'
import { getMe, closeProfile } from '../actions/me'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.me

  }
}

export default connect(mapStateToProps, {
  closeProfile,
  getMe
})(Main)
