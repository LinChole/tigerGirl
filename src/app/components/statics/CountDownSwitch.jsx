import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { sec2time } from '../../library/tools'

function CountDownSwitch(props) {
  const { minute, disabled, endAction, alertMsg } = props
  let initSecond = minute * 60 || 5
  const [autoSave, setAutoSave] = useState(false)
  const [time, setTime] = useState(initSecond)
  let counter
  useEffect(() => {
    if (autoSave) timer()
    else {
      setTime(initSecond)
      clearTimeout(counter)
    }
    return () => {
      clearTimeout(counter)
    }
  }, [autoSave])
  const timer = (preTime) => {
    preTime = preTime || time
    if (preTime > 0) {
      const nowTime = preTime - 1
      setTime(nowTime)
      if (nowTime > 0) {
        counter = setTimeout(() => timer(nowTime), 1000)
      } else {
        setTime(initSecond)
        endAction()
        window.alert(alertMsg)
        timer()
      }
    }
  }
  console.log(autoSave, time, sec2time(time))
  return (
    <div className='fw-flex fw-flex-jc-end'>
      {
        !disabled && (
          <div className='fw-vm w3-margin-right'>{sec2time(time)}</div>
        )
      }
      <FormControlLabel
        control={
          <Switch
            name='countDownSwitch'
            checked={autoSave}
            onChange={() => setAutoSave(!autoSave)}
            color='primary'
            disabled={disabled}
          />
        }
        label={`幫我每${minute}分鐘自動暫存一次`}
      />
    </div>
  )
}

CountDownSwitch.propTypes = {
  minute: PropTypes.number,
  disabled: PropTypes.bool,
  endAction: PropTypes.func,
  alertMsg: PropTypes.string
}

export default CountDownSwitch
