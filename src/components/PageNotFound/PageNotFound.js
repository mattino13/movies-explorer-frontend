import React from 'react';
import { useNavigate } from 'react-router-dom';

import './PageNotFound.css'

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="pagenotfound"> 
      <h1 className="pagenotfound__title">404</h1>
      <p className="pagenotfound__text">Страница не найдена</p>
      <p className="pagenotfound__text pagenotfound__text_color" onClick={() => navigate(-1)}>назад</p>
    </div>
  )
}

export default PageNotFound;