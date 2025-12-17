import React from 'react'
import PropTypes from 'prop-types'
import { inputUnfilledPlaceholder } from 'Config'
import { inputClass } from '../../library/table/tools'

function Textarea(props) {
  const { name, val, onInput, cn, rows, resize, required } = props
  return (
    <>
      <div>(Shift+Enter 換行)</div>
      <textarea
        name={name}
        placeholder={inputUnfilledPlaceholder}
        className={`${inputClass('textarea')} ${cn}`}
        rows={rows}
        defaultValue={val}
        onInput={(e) => onInput && onInput(name, e.target.value)}
        style={{ 'resize': resize ? 'auto' : 'none' }}
        required={required}
      />
    </>
  )
}

Textarea.defaultProps = {
  rows: 3
}

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onInput: PropTypes.func,
  cn: PropTypes.string,
  rows: PropTypes.number,
  resize: PropTypes.bool,
  required: PropTypes.bool
}

export default Textarea
