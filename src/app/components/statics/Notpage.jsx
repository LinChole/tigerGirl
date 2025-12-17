import React from 'react'
import pnf from '../../images/page-not-found.png'

function Notpage(props) {
  return (
    <div className='w3-container'>
      <div className={`w3-padding-32 w3-center w3-text-${props.color}`}>
        <img className='w3-section fw-w-50' src={pnf} alt='notpage' />
        <h1>404 Not Found</h1>
        <h1>你所造訪的頁面並不存在</h1>
      </div>
    </div>
  )
}

Notpage.defaultProps = {
  color: 'black'
}

export default Notpage
