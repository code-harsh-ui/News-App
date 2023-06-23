import React from 'react'
import loading from '../loading.gif'

// This component is already a function based component that is why we don't need to change anything

function Spinner() {
  return (
    <div style={{marginTop: '10rem'}} className='d-flex align-item-center justify-content-center'>
        <img src={loading} alt="laoding"/>
    </div>
  )
}

export default Spinner