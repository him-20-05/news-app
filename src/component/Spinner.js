import React from 'react'
import loading from './Spinner-2.gif'

function Spinner() {
  return (
    <div className='d-flex justify-content-center'>
      <img src={loading} alt='loading'/>
    </div>
  )
}

export default Spinner
