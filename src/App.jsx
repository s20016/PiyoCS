import React from 'react'
import './style/App.css'

import Search from './component/Search'
import Footer from './component/Footer'

const App = () => {
  return (
    <div className='app-wrapper'>
      <Search />
      <Footer className='footer'/>
    </div>
  )
}

export default App
