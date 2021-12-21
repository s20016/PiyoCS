import React from 'react'
import s20016 from '../img/s20016.png'
import s20022 from '../img/s20022.png'
import s20024 from '../img/s20024.png'

const Footer = () => {
  return (
    <div className='footer-wrapper'>
      <div className="footer-box">
          <h3>piyopiyo</h3>
          <h4>cheatsheet</h4>
          <ul>
            <li><img src={s20016} alt="s20016" className='icon'/></li>
            <li><img src={s20022} alt="s20022" className='icon'/></li>
            <li><img src={s20024} alt="s20024" className='icon'/></li>
          </ul>
      </div>
    </div>
  )
}

export default Footer
