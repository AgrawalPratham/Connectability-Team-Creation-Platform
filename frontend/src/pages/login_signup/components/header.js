import React from 'react';
import './mainform.css';
import logo from'../../../images/Logo.png'

const Header = () => (
  <div className="header-container">
    <div className="logo">
    <img src={logo}  alt= 'Connectability_ Logo'/>
    </div>
    <h2>ConnectAbility: Art of Connecting Ideas</h2>
  </div>
);

export default Header;
