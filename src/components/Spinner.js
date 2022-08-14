import React from 'react'
import loading from '../loading.gif'

export default function Spinner() {
  return (
    <div style={{marginTop: '10rem'}} className='d-flex align-item-center justify-content-center'>
        <img src={loading} alt="laoding"/>
    </div>
  )
}
