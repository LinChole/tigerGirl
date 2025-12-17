import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { notEffect } from '../../library/table/events'
import { inputClass } from '../../library/table/tools'
import { is } from '../../library/tools'

function RadioCheckbox(props) {
  const {
    type, name, required, readOnly, checked, title, red, intactValue, dataAttr, strong, color, onInput, children,
    isOnChange, realValue
  } = props
  const baseProps = {
    type: type,
    id: children ? `${name}_${children}` : null,
    name: name,
    className: inputClass(type, readOnly, red),
    required: required,
    readOnly: readOnly,
    value: !is(realValue) ? realValue : children,
    'data-title': title,
    'data-intactvalue': intactValue,
    'data-attr': dataAttr,
    onClick: readOnly ? notEffect : null,
  }
  return (
    <span>
      {
        !isOnChange
          ? <input
            defaultChecked={checked}
            onInput={(e) => onInput && !readOnly && onInput(name, e.target.checked ? e.target.value : null)}
            {...baseProps}
          />
          : <input
            checked={checked}
            onChange={(e) => onInput && !readOnly && onInput(name, e.target.checked ? e.target.value : null)}
            {...baseProps}
          />
      }&nbsp;
      {
        children && (
          <label htmlFor={`${name}_${children}`} className={classNames({ [`w3-text-${color}`]: color })}>
            {
              !strong ? children : <strong>{children}</strong>
            }
          </label>
        )
      }
    </span>
  )
}

RadioCheckbox.defaultProps = {
  children: ''
}

RadioCheckbox.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  checked: PropTypes.bool,
  title: PropTypes.string,
  red: PropTypes.bool,
  intactValue: PropTypes.string,
  dataAttr: PropTypes.string,
  strong: PropTypes.bool,
  color: PropTypes.string,
  onInput: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  isOnChange: PropTypes.bool,
  realValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default RadioCheckbox
