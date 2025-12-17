import React from 'react'
import banner from '../../images/title.png'
import edu from '../../images/edu.png'

function Banner() {
  return (
    <div
      style={{
        // backgroundImage: `url(${banner})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='fw-mw-600 fw-screen'>
        <div className='w3-padding-12 fw-flex'>
          <div className='fw-flex-1 fw-vm w3-container fw-hide-740' style={{ flexGrow: 2 }}>
            {/* <img src={edu} width='100%' /> */}
          </div>
          <div className='fw-flex-1 w3-text-black fw-banner fw-pd-10' style={{ flexGrow: 10 }}>
            {/* <h1 className='fw-bold'>教育部主管高級中等學校</h1> */}
            {/* <h1 className='fw-bold'>國中畢業生適性入學宣導網填報系統</h1> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner