import React from 'react'
import PropTypes from 'prop-types'
import { inputClass } from '../../library/table/tools'
import { inputUnfilledPlaceholder } from 'Config'

function typeVal(type, val, sum) {
  if (type === 'number') { // Number
    if (sum) { // sum
      return Number(val)
    } else {
      return val === '' ? null : Number(val)
    }
  } else return val
}

function Input(props) {
  let {
    type, list, name, required, readOnly, step, title, min, pattern, autoFocus, val, onInput, red, intactValue, accept, cn, placeHolder, onKeyPress, isOnChange, multiple, autoComplete, full, max, onBlur, sum
  } = props
  const baseProps = {
    type: type,
    list: list,
    name: name,
    placeholder: placeHolder || inputUnfilledPlaceholder,
    className: `${inputClass(type, readOnly, red, full)} ${cn}`,
    required: required,
    readOnly: readOnly,
    disabled: type === 'file' && readOnly,
    step: step,
    title: list && pattern && '請選擇下拉式選單內的選項。',
    min: min,
    max: max,
    pattern: pattern,
    autoFocus: autoFocus,
    accept: accept,
    onKeyPress: onKeyPress,
    'data-title': title,
    'data-intactvalue': intactValue,
    multiple: multiple,
    autoComplete,
    onBlur
  }
  return !isOnChange
    ? (
      <input
        defaultValue={val}
        onInput={(e) => {
          onInput && (
            type !== 'file'
              ? onInput(name, typeVal(type, e.target.value, sum))
              : onInput(e.target.files)
          )
        }}
        {...baseProps}
      />
    ) : (
      <input
        value={val}
        onChange={(e) => {
          onInput && (
            type !== 'file'
              ? onInput(name, typeVal(type, e.target.value, sum))
              : onInput(e.target.files)
          )
        }}
        {...baseProps}
      />
    )

}

Input.defaultProps = {
  cn: '',
  val: '',
  full: true
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  list: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  step: PropTypes.number,
  title: PropTypes.string,
  min: PropTypes.number,
  pattern: PropTypes.string,
  autoFocus: PropTypes.bool,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onInput: PropTypes.func,
  red: PropTypes.bool,
  intactValue: PropTypes.string,
  accept: PropTypes.string,
  cn: PropTypes.string,
  placeHolder: PropTypes.string,
  onKeyPress: PropTypes.func,
  isOnChange: PropTypes.bool,
  multiple: PropTypes.bool,
  autoComplete: PropTypes.string,
  full: PropTypes.bool,
  max: PropTypes.number,
  onBlur: PropTypes.func,
  sum: PropTypes.bool
}

export default Input
