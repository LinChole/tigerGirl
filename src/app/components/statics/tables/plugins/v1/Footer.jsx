import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import FWTd from '../../../../../containers/tables/FWTd'

function Footer(props) {
  const { isOnly, isMaker, part } = props
  return (
    <table className={classNames('fw-t fw-t-layout w3-left-align w3-section', { 'only-t-print': isOnly })}>
      <tbody>
        <tr>
          <th>{!isMaker ? '填表人員' : '製表'}</th>
          {
            isOnly
              ? <FWTd {...props} type='string' name={part ? `${part}$sbs_999_0_0` : 'sbs_999_0_0'} />
              : <FWTd {...props} type='text' name={part ? `${part}$sbs_999_0_0` : 'sbs_999_0_0'} />
          }
          <th>審核</th>
          <FWTd {...props} type='string' name={part ? `${part}$sbs_999_0_1` : 'sbs_999_0_1'} />
          <th>主辦業務人員</th>
          <FWTd {...props} type='string' name={part ? `${part}$sbs_999_0_2` : 'sbs_999_0_2'} />
          <th>機關長官</th>
          <FWTd {...props} type='string' name={part ? `${part}$sbs_999_0_3` : 'sbs_999_0_3'} />
        </tr>
        <tr>
          {
            !isMaker ? (
              <>
                <th>填表人員電話</th>
                {
                  isOnly
                    ? <FWTd {...props} type='string' name={part ? `${part}$sbs_999_1_0` : 'sbs_999_1_0'} colSpan={3} />
                    : <FWTd {...props} type='text' name={part ? `${part}$sbs_999_1_0` : 'sbs_999_1_0'} colSpan={3} />
                }
              </>
            ) : <td colSpan='4'>&nbsp;</td>
          }
          <th>主辦統計人員</th>
          <FWTd {...props} type='string' name={part ? `${part}$sbs_999_1_1` : 'sbs_999_1_1'} colSpan={3} />
        </tr>
      </tbody>
    </table>
  )
}

Footer.defaultProps = {
  isOnly: true,
  isMaker: false
}

Footer.propTypes = {
  isOnly: PropTypes.bool,
  isMaker: PropTypes.bool,
  part: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default Footer
