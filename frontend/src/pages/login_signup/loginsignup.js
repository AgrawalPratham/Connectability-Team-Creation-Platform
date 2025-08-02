import React from 'react'
import './loginsignup.css'

import Header from './components/header.js'
import Mainform from './components/mainform.js'



export default function Home() {
  return (
    <div className='loginsignup'>
        <Header/>
        <Mainform/>
    </div>
  )
}

