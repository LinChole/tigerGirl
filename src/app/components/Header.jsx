import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/icons/Menu'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { headerBackground } from 'Config'
import Loading from './statics/Loading'
import { size } from '../library/tools'
import Profile from '../containers/FWProfile'
import Banner from './statics/Banner'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  }
}))

function Header(props) {
  const classes = useStyles()
  const {
    left, right, docked, title,
    open, items,
    toggleSidebarVisibility,
    toggleProfile
  } = props
  return (
    <AppBar position='fixed' className={`${classes.appBar} ${headerBackground}`}>
      <Banner />
      {/* <Toolbar variant={!docked ? 'dense' : 'regular'}> */}
      <Toolbar variant='dense'>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
          onClick={() => toggleSidebarVisibility('left')}
        >
          {left ? <ChevronLeft /> : <Menu />}
        </IconButton>
        <Typography variant='h6' className={classes.title}>{title || ''}</Typography>
        {
          !!size(items) && (
            <div>
              <IconButton
                edge='end'
                color='inherit'
                aria-label='account of current user'
                onClick={toggleProfile}
              >
                <AccountCircle />
              </IconButton>
              {open && <Profile />}
            </div>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  left: PropTypes.bool.isRequired,
  right: PropTypes.bool.isRequired,
  docked: PropTypes.bool.isRequired,
  title: PropTypes.string,
  open: PropTypes.bool,
  items: PropTypes.object,
  toggleSidebarVisibility: PropTypes.func.isRequired,
  toggleProfile: PropTypes.func.isRequired
}

export default Header
