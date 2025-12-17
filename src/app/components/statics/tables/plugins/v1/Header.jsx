import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Header(props) {
  const { colLeft, classification, kind, timeLimit, schoolName, agency, tableNumber, detail, rules, noBottomLine } = props
  const isBottomLine = detail.length === 0 && rules.length === 0
  return (
    <table className='fw-t fw-th-gray'>
      <colgroup>
        <col style={{ width: isBottomLine ? 150 : 230 }} />
        <col />
        {
          isBottomLine
            ? (
              <Fragment>
                <col style={{ width: 150 }} />
                <col style={{ width: 250 }} />
              </Fragment>
            ) : <col style={{ width: 670 }} />
        }
      </colgroup>
      <tbody>
        <tr>
          {
            isBottomLine
              ? <th className='fw-b'>{classification}</th>
              : (
                <td>
                  {
                    detail.map((dt, index) => (
                      <div key={index}>{dt}</div>
                    ))
                  }
                </td>
              )
          }
          <td rowSpan={isBottomLine ? 2 : null} className={classNames('fw-cell-bottom', { 'fw-b-bottom': isBottomLine })}>
            <div className='w3-container'>{timeLimit}</div>
          </td>
          {
            isBottomLine
              ? (
                <Fragment>
                  <th className='fw-b'>編製機關</th>
                  <td className='w3-center fw-b'>{schoolName}({agency})</td>
                </Fragment>
              ) : (
                <td className='fw-b'>
                  <ol>
                    {
                      rules.map((role, index) => (
                        <li key={index}>{role}</li>
                      ))
                    }
                  </ol>
                </td>
              )
          }
        </tr>
        {
          isBottomLine && (
            <tr>
              <th className='fw-b'>{kind}</th>
              <th className='fw-b'>表號</th>
              <td className='w3-center fw-b'>{tableNumber}</td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

Header.defaultProps = {
  colLeft: 2,
  classification: '',
  kind: '',
  schoolName: '國立測試高中',
  agency: '',
  tableNumber: '',
  detail: [],
  rules: [],
  noBottomLine: true
}

Header.propTypes = {
  colLeft: PropTypes.number,
  classification: PropTypes.string,
  kind: PropTypes.string,
  timeLimit: PropTypes.string.isRequired,
  schoolName: PropTypes.string,
  agency: PropTypes.string,
  tableNumber: PropTypes.string,
  detail: PropTypes.array,
  rules: PropTypes.array,
  noBottomLine: PropTypes.bool
}

export default Header
