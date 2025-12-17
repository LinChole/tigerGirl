import { connect } from 'react-redux'
import {
  closeProfile,
  logout
} from '../actions'
import Profile from '../components/Profile'

const mapStateToProps = (state) => {
  return {
    ...state.me
  }
}

export default connect(mapStateToProps, {
  closeProfile,
  logout,
  handleClickOutside: closeProfile
})(Profile)