import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import RadioCheckbox from './RadioCheckbox'

function RadioCheckboxArray(props) {
  const {
    type, name, required, readOnly, title, val, options, onInput, red, intactValue,
    newline
  } = props
  return (
    <Fragment>
      {options.map((option, index) => {
        return (
          <Fragment key={index}>
            <RadioCheckbox
              type={type}
              name={name}
              required={required}
              readOnly={readOnly}
              checked={option === val}
              title={title}
              red={red}
              intactValue={intactValue}
              onInput={onInput}
            >{option}</RadioCheckbox>
            {newline && index < options.length - 1 && <br />}
          </Fragment>
        )
      })}
    </Fragment>
  )
}

RadioCheckboxArray.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  title: PropTypes.string,
  val: PropTypes.string,
  options: PropTypes.array.isRequired,
  onInput: PropTypes.func,
  red: PropTypes.bool,
  intactValue: PropTypes.string,
  newline: PropTypes.bool,
}

export default RadioCheckboxArray
