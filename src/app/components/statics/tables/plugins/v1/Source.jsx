import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function Source(props) {
  const { source, description, date, descriptionRed } = props
  return (
    <table className='fw-t w3-section'>
      <colgroup>
        <col />
        <col style={{ width: 200 }} />
      </colgroup>
      <tbody>
        <tr>
          <td>
            <div>資料來源：{source}</div>
            {
              typeof description !== 'string'
                ? (
                  <>
                    <div>填表說明</div>
                    <ol>
                      {
                        description.map((des, index) => (
                          <li key={index}>{des}</li>
                        ))
                      }
                    </ol>
                  </>
                ) : <div className={classNames({ 'w3-text-red': descriptionRed })}>填表說明：{description}</div>
            }
          </td>
          <td className='w3-right-align fw-cell-top'>中華民國 {date}編製</td>
        </tr>
      </tbody>
    </table>
  )
}

Source.defaultProps = {
  date: '　　年　　月　　日'
}

Source.propTypes = {
  source: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]).isRequired,
  date: PropTypes.string,
  descriptionRed: PropTypes.bool
}

export default Source
