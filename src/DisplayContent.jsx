import React from 'react'

const DisplayContent = (props) => {
  return (
    <div>
      <div>
        {props.lang}
      </div>
      <div>
        <pre>code:{props.code}</pre>
        <pre>sample:{props.sample}</pre>
        <pre>result:{props.result}</pre>
      </div>
    </div>
  )
}

export default DisplayContent
