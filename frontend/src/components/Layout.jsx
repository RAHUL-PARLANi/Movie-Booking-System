import React from 'react'
import Navbar from './Navbar'

const Layout = (prop) => {
  return (
    <div>
      <Navbar/>  
      {prop.children}
    </div>
  )
}

export default Layout
