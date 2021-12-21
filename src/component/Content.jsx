import React, { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-kotlin'
import 'prismjs/themes/prism-twilight.css'

const Content = (props) => {
  useEffect(async () => {
    Prism.highlightAll()
  })

  return (
    <div className='content-wrapper'>
      <div className='content-box'>
        <div className='header'>
          <div className='header-lang'>{props.lang}</div>
          <div className='header-stmt'>{props.stmt}</div>
          <hr className='divider'/>
        </div>
        <div className='code'>
          <p className='title'>sample</p>
          <pre>
            <code className={`language-${props.lang}`}>
              {props.code}
            </code>
          </pre>
          <p className='title'>code</p>
          <pre>
            <code className={`language-${props.lang}`}>
              {props.sample}
            </code>
          </pre>
          <p className='title'>result</p>
          <pre>
            <code className={`language-${props.lang}`}>
              {props.result}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default Content
