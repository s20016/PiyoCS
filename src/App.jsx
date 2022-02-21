import React from 'react'
import './style/App.css'

import Search from './component/Search'
import Music from './component/Music'

const App = () => {
  return (
    <div className='main-wrapper'>
      <div className='app-wrapper'>
        <Search />
      </div>
      <div className="music-wrapper">
        <Music />
      </div>
    </div>
  )
}

export default App
