import React from 'react'
import PropTypes from 'prop-types'
import { inc } from '../../../../../library/tools'

function Subject(props) {
  const { colLeft, colRight, schoolid, systemtype, daynighttype, primary, secondary, unit, publicprivate } = props
  return (
    schoolid ? (
      <div className='w3-row'>
        <table className={`fw-t-all-light-gray fw-t-layout fw-th-gray w3-col s${colLeft}`}>
          <thead>
            <tr>
              <th>學校代號</th>
              {systemtype && <th>學制別</th>}
              {daynighttype && <th>日夜別</th>}
              {publicprivate && <th>公私立</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='w3-center'>{schoolid}</td>
              {systemtype && <td className='w3-center'>{systemtype}</td>}
              {daynighttype && <td className='w3-center'>{daynighttype}</td>}
              {publicprivate && <td className='w3-center'>{schoolid.substr(2, 1) === '1' ? '私立' : '公立'}</td>}
            </tr>
          </tbody>
        </table>
        <table className={`fw-t fw-t-layout w3-right-align w3-col s${colRight}`}>
          <tbody>
            <tr>
              <td>{secondary}</td>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>{primary}</td>
              {
                unit && (
                  <td>
                    {!inc(unit, '：') ? `單位：${unit}` : unit}
                  </td>
                )
              }
            </tr>
          </tbody>
        </table>
      </div>
    ) : (
        <table className='fw-t'>
          <tbody>
            <tr>
              <td className='w3-center'>{primary}</td>
            </tr>
          </tbody>
        </table>
      )
  )
}

Subject.defaultProps = {
  colLeft: 2,
  colRight: 10,
  secondary: ''
}

Subject.propTypes = {
  colLeft: PropTypes.number,
  colRight: PropTypes.number,
  schoolid: PropTypes.string,
  systemtype: PropTypes.string,
  daynighttype: PropTypes.string,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  unit: PropTypes.string,
  publicprivate: PropTypes.bool
}

export default Subject
