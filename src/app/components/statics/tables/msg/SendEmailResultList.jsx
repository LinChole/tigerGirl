import React from 'react'
import PropTypes from 'prop-types'

function SendEmailResultList(props) {
  return (
    <table className='fw-t-all-light-gray fw-th-gray w3-striped'>
      <thead>
        <tr>
          <th>學校代碼</th>
          <th>寄送結果</th>
        </tr>
      </thead>
      <tbody>
        {
          props.data.map((d, index) => (
            <tr key={index}>
              <td className='w3-center'>{d.CName}</td>
              <td className={`w3-text-${d.result ? 'teal' : 'red'} w3-center`}>{d.result ? '成功' : '失敗'}</td>
            </tr>
          ))
        }
      </tbody>
      <tfoot>
        <tr>
          <td colSpan='2'>
            <p>若「寄送結果」為「失敗」，請確認該校電子信箱地址是否正確。</p>
            <p>若經過多次嘗試後，「寄送結果」仍為「失敗」，請聯繫系統管理員處理。</p>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

SendEmailResultList.propTypes = {
  data: PropTypes.array.isRequired
}

export default SendEmailResultList
