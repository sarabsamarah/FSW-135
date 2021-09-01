import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props){
  const { logout } = props
  return (
    <div className="navbar">

      <Link to="/profile">Profile</Link>
      <br></br>
      <Link to="/public">Public</Link>
      <br></br>
      <Link to="/issues">Issues</Link>
      <button onClick={logout}>Logout</button>
      <br></br>
    </div>
  )
}