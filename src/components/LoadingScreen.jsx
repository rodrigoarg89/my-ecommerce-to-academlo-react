import React from 'react'
import '../styles/loading-screen.css'

const LoadingScren = () => {
  return (
    <div className=' overlay'>
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default LoadingScren