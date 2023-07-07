import React from 'react'
import { useSelector } from 'react-redux'

const WelcomePencari = () => {
    const {user} = useSelector((state) => state.auth)

  return (
    <div>
         <h1 className='title'>Dashboard</h1>
        <h2 className='subtitle'>Selamat Datang {user && user.name}</h2>
    </div>
  )
}

export default WelcomePencari