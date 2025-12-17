import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { inputClass } from '../../library/table/tools'
import { notEffect } from '../../library/table/events'
import { inc } from '../../library/tools'

function Select(props) {
  const { name, required, valOptions, cntOptions, val, cn, onInput, readOnly, full, red, isOnChange, disOptions } = props
  const evt = readOnly ? notEffect : null
  const valProps = !isOnChange
    ? {
      defaultValue: val,
      onInput: (e) => {
        onInput && e.target.value !== '' && onInput(name, e.target.value)
      }
    } : {
      value: val,
      onChange: (e) => {
        onInput && e.target.value !== '' && onInput(name, e.target.value)
      }
    }
  return (
    <select
      name={name}
      className={classNames({ 'fw-ctrlDisabled': readOnly }, `${inputClass('select', readOnly, red, full)} ${cn}`)}
      onMouseDown={evt}
      onMouseEnter={evt}
      required={required}
      {...valProps}
    >
      <option value=''>請選擇</option>
      {
        valOptions.map((val, index) => (
          <option
            value={val}
            disabled={props.val !== val && inc(disOptions, val)}
            hidden={props.val === val && inc(disOptions, val)}
            key={index}
          >{cntOptions?.[index] || val}</option>
        ))
      }
    </select>
  )
}

Select.defaultProps = {
  cn: '',
  valOptions: [],
  cntOptions: [],
  full: false
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  valOptions: PropTypes.array.isRequired,
  cntOptions: PropTypes.array,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  cn: PropTypes.string,
  onInput: PropTypes.func,
  readOnly: PropTypes.bool,
  full: PropTypes.bool,
  red: PropTypes.bool,
  isOnChange: PropTypes.bool,
  disOptions: PropTypes.array
}

export default Select
