import React from 'react'
import MainNavbar from './UserNavbar'

const UserLayout = (prop) => {
  return (
    <div>
      <MainNavbar/>  
      {prop.children}
    </div>
  )
}

export default UserLayout
