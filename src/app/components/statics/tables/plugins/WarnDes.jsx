import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import FWTd from '../../../../containers/tables/FWTd'

function WarnDes(props) {
  const { Info, data_remark } = props.items
  const closeCount = data_remark.filter(f => Info.databyte < 2 ? !f.open : f.note === '').length
  return data_remark.length !== closeCount && (
    <table className='fw-t-all-light-gray fw-th-gray w3-section'>
      <thead>
        <tr>
          <th>編號</th>
          <th>備註說明</th>
        </tr>
      </thead>
      <tbody>
        {
          data_remark
            .filter(f => !(Info.databyte < 2 ? !f.open : f.note === ''))
            .map(d => (
              <Fragment key={d.UUID}>
                <tr>
                  <th rowSpan='2'>{d.ErrorCode}</th>
                  <td>{d.ErrorDes}</td>
                </tr>
                <tr>
                  <FWTd {...props} type='text' name={`remark$${d.UUID}$note`} />
                </tr>
              </Fragment>
            ))
        }
      </tbody>
    </table>
  )
}

WarnDes.propTypes = {
  items: PropTypes.object.isRequired
}

export default WarnDes