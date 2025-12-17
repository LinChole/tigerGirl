import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { inc } from '../../../library/tools'

function AddNullTdContent(props) {
  const { i, max, rowTdCount, mainLength } = props
  if (mainLength > rowTdCount) {
    const nullTdArray = []
    let j = 0
    if (i === (max - 1)) {
      while (j < i * rowTdCount + rowTdCount - mainLength) {
        const nullTd = <td key={j} />
        nullTdArray.push(nullTd)
        j++
      }
      return nullTdArray
    } else return null
  } else return null
}

AddNullTdContent.propTypes = {
  i: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  rowTdCount: PropTypes.number.isRequired,
  mainLength: PropTypes.number.isRequired
}

function TbodyContent(props) {
  let {
    index, max, rowTdCount, main, sendArray, tempSendObj,
    Comp,
    onChange
  } = props
  let tbodyArray = []
  let i = 0
  while (i < max) {
    const result = (
      <tr key={i}>
        <th className='w3-center'>{i * rowTdCount + 1}</th>
        {
          main
            .filter((_, index) => index >= (i * rowTdCount) && index <= (i * rowTdCount + (rowTdCount - 1)))
            .map((item, index2) => {
              const { year, scode, schoolname, CID, OID, email, reader, mark } = item
              const name = `send_${index}_${i}_${index2}`
              const isSend = !!sendArray?.length && inc(sendArray, name)
              return (
                <td className={classNames({ 'w3-text-teal': !reader && isSend })} key={index2}>
                  <Comp {...item} isSend={isSend} name={name} onChange={onChange} data={tempSendObj} mark={mark} />
                  <label htmlFor={name}>{schoolname}</label>
                </td>
              )
            })
        }
        <AddNullTdContent i={i} max={max} rowTdCount={rowTdCount} mainLength={main.length} />
      </tr>
    )
    tbodyArray.push(result)
    i++
  }
  return tbodyArray
}

TbodyContent.defaultProps = {
  index: 0
}

TbodyContent.propTypes = {
  index: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  rowTdCount: PropTypes.number.isRequired,
  main: PropTypes.array.isRequired,
  sendArray: PropTypes.array,
  Comp: PropTypes.func,
  onChange: PropTypes.func,
  tempSendObj: PropTypes.object
}

export default TbodyContent