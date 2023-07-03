import React from 'react';
import { Link } from 'react-router-dom';

import './SiteLogo.css'
import logo from '../../images/logo.svg';

function SiteLogo({ className }) {
  return (
    <Link to="/">
      <img className={`siteLogo ${className}`} src={logo} alt="Логотип проекта"/>
    </Link>
  )
}

export default SiteLogo;