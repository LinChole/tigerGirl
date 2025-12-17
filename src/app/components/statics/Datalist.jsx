import React from 'react'
import PropTypes from 'prop-types'
import Input from './Input'

function Datalist(props) {
  const { name, readOnly, required, title, val, onInput, full, valOptions, cntOptions } = props
  const pattern = valOptions.join('|')
  const datalist = valOptions.map((val, index) => {
    const ch = cntOptions?.[index]
    return <option value={val} key={index}>{ch ? `${val}-${ch}` : val}</option>
  })
  return (
    <>
      <Input
        type='text'
        name={name}
        list={name}
        pattern={pattern}
        readOnly={readOnly}
        required={required}
        title={title}
        val={val}
        onInput={onInput}
        full={full}
      />
      <datalist id={name}>{datalist}</datalist>
    </>
  )
}

Datalist.defaultProps = {
  valOptions: [],
  cntOptions: [],
  full: false
}

Datalist.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  valOptions: PropTypes.array.isRequired,
  cntOptions: PropTypes.array,
  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  title: PropTypes.string,
  onInput: PropTypes.func,
  readOnly: PropTypes.bool,
  full: PropTypes.bool
}

export default Datalist
