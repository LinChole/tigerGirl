import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'
import Loading from './statics/Loading'
import { size } from '../library/tools'
import Icons from './statics/Icons'
import PermIdentity from '@material-ui/icons/PermIdentity'
import Text from './statics/Text'
import Button from './statics/Button'

const styles = {
  side: {
    position: 'fixed',
    top: 45,
    right: 20,
    minWidth: 215,
    zIndex: 2
  },
  triangleInt: {
    width: 0,
    height: 0,
    borderWidth: 15,
    borderStyle: 'solid',
    borderColor: 'transparent transparent #555 transparent',
    position: 'absolute',
    top: -14,
    right: 10
  },
  triangleOut: {
    width: 0,
    height: 0,
    borderWidth: 15,
    borderStyle: 'solid',
    borderColor: 'transparent transparent #fff transparent',
    position: 'absolute',
    top: -14,
    right: 10
  }
}

function Profile(props) {
  const {
    open, fetching, items,
    closeProfile, logout
  } = props


  return (
    <div style={styles.side}>
      {/* <span style={styles.triangleInt} /> */}
      {/* <span style={styles.triangleOut} /> */}
      <div className='w3-card w3-white w3-section'>
        {
          (() => {
            if (fetching) return <Loading full>資料請求中</Loading>
            if (!size(items)) return '沒有資料'
            return (
              <div className='w3-container w3-section'>
                <div className='w3-section'>
                  <Icons Icon={PermIdentity} />
                  <Text strong>{items?.Name}</Text>
                </div>
                <div className='w3-section'>
                  <Button full color='indigo' onClick={() => {
                    logout()
                    closeProfile()
                  }}>登出</Button>
                </div>
              </div>
            )
          })()
        }
      </div>
    </div>
  )
}

Profile.propTypes = {
  open: PropTypes.bool,
  fetching: PropTypes.bool.isRequired,
  items: PropTypes.object,
  closeProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  handleClickOutside: PropTypes.func.isRequired
}

export default onClickOutside(Profile)