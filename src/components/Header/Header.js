import React from 'react';
import { useLocation } from "react-router-dom";

import './Header.css'
import Navigation from '../Navigation/Navigation.js';
import SiteLogo from '../SiteLogo/SiteLogo.js';



function Header({ loggedIn }) {
  const currentLocation = useLocation().pathname;

  return (
    <header className={`header ${currentLocation === "/" && "header_dark"}`}>
      <SiteLogo/>
      <Navigation loggedIn={loggedIn}></Navigation> 
    </header>
  )
}

export default Header;