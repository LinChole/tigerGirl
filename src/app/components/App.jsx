import React, { useEffect, useCallback } from "react"
import classNames from 'classnames'
import throttle from 'lodash/throttle'
import PropTypes from 'prop-types'

import { makeStyles, useTheme } from "@material-ui/core/styles"
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'
import CssBaseline from '@material-ui/core/CssBaseline'

import Header from "../containers/FWHeader"
import Sidebar from "../containers/FWSidebar"
import Confirm from "../containers/FWConfirm"
import Dialog from "../containers/FWDialog"
import Snackbar from "../containers/FWSnackbar"
import ListItemLink from './statics/ListItemLink'
import Main from "../containers/FWMain"


import { containerMaxWidth, sidebarWidth } from 'Config'

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    zIndex: 1
  },
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  contentShiftLeft: {
    ...useStyles.contentShift,
    marginLeft: '0 !important'
  },
  // contentShiftRight: {
  //   ...useStyles.contentShift,
  //   marginRight: '0 !important'
  // },
  toolbar: theme.mixins.toolbar,
  banner: {
    padding: theme.spacing(7, 0)
  }
}));

function HideOnScroll(props) {
  const { children } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger()
  return (
    <Slide direction='down' in={!trigger}>
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired
}


function App(props) {
  const classes = useStyles();
  const theme = useTheme();

  const {
    left, right, docked,
    resizeWindow, fetching, items, error, getMe
  } = props

  useEffect(() => {
    resizeWindow()
    window.onresize = () => middleResizeThrottle()
    return () => {
      window.onresize = null
    }
  }, [])

  const middleResizeThrottle = useCallback(throttle(resizeWindow, 500), [])
  return (
    <div className='fw-flex fw-bg-white'>
      {/* <CssBaseline /> */}
      <Sidebar />
      <Header />
      <main
        className={classNames(classes.main, {
          [classes.content]: docked
        }, {
          [classes.contentShiftLeft]: docked && left
          // }, {
          // [classes.contentShiftRight]: docked && right
        }, 'fw-w-100')}
        style={{
          marginLeft: docked && -sidebarWidth,
          // marginRight: docked && -sidebarWidth
        }}
      >
        {/* <div className={classes.toolbar} /> */}
        {/* <div className={classes.banner} /> */}
        <div className={`fw-screen fw-mw-${containerMaxWidth} w3-white`}>
          <div className="w3-container w3-padding-16">
            <Main />
          </div>
        </div>
        <div className={classes.toolbar} />
      </main>
      <Dialog />
      <Confirm />
      <Snackbar />
    </div>
  );
}


App.propTypes = {
  menu: PropTypes.array
}

export default App;
