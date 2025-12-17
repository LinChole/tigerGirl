import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  vheight: {
    height: 'calc(100vh - 160px)'
  }
}))

function Loading(props) {
  const classes = useStyles()
  const [dot, setDot] = useState(0)
  let counter
  useEffect(() => {
    timer()
    return () => {
      clearTimeout(counter)
    }
  }, [])
  const timer = (preDot) => {
    preDot = preDot || dot
    const nowDot = preDot === 3 ? 1 : (preDot + 1)
    setDot(nowDot)
    counter = setTimeout(() => timer(nowDot), 1000)
  }
  return (
    <div className={classNames('fw-vm fw-flex-column', {
      [classes.vheight]: props.full
    })}>
      <CircularProgress />
      {props.children && <h1>{props.children}{
        (() => {
          let i = 1
          let dotTxt = ''
          while (i <= dot) {
            dotTxt += '.'
            i++
          }
          return dotTxt
        })()
      }</h1>}
    </div>
  )
}

Loading.propTypes = {
  full: PropTypes.bool,
  children: PropTypes.string
}

export default Loading
