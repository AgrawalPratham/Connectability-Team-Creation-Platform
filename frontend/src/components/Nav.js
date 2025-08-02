import React from 'react'
import './Nav.css'
import Logo from '../images/Logo.png'
import { Link, useNavigate } from 'react-router-dom'

import dashboard from '../images/dashboard.png'
import profile from '../images/profile.png'
import teams from '../images/teams.png'
import alarm from '../images/Alarm.png'
import logout_image from '../images/Logout.png'
import { AuthData } from '../Auth/AuthWrapper'


 export default function Nav() {
   const { logout } = AuthData();
   const navigate = useNavigate()

  const handleLogout = () =>{
    logout()
    navigate("/")
    
  }


   return (
     <nav className="nav">
       <div className='navbar-icon'>
         <div className='nav-logo'>
          <img  src={Logo} />
         </div>
         <p>CONNECTABILITY</p>
       </div>
       <div className='navbar-list'>
         <Link to="/dashboard" className='navbar-list-item'>
           <img src={dashboard}></img>
           <p>Dashboard</p>
         </Link>

         <Link to="/profile" className='navbar-list-item'>
           <img src={profile}></img>
           <p>Profile</p>
         </Link>

         {/* <Link to="/" className='navbar-list-item'>
           <img src={teams}></img>
           <p>Teams</p>
         </Link> */}

         <Link to="/invitation" className='navbar-list-item'>
           <img src={alarm}></img>
           <p>Invitations</p>
         </Link>

         <button className='navbar-list-item logout-button' onClick={handleLogout}>
           <img src={logout_image}></img>
           <p>Logout</p>
         </button>

       </div>
     </nav>
   )
 }
 