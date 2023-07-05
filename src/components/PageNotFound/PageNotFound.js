import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './PageNotFound.css'

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="pagenotfound"> 
      <h1 className="pagenotfound__title">404</h1>
      <p className="pagenotfound__text">Страница не найдена</p>
      <Link className="pagenotfound__text pagenotfound__text_color" onClick={() => navigate(-1)}>Назад</Link>
    </div>
  )
}

export default PageNotFound;