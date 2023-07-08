import React from 'react';
import './Portfolio.css'

import portfolio from '../../images/portfolio-icon.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__subtitle">Портфолио</p>
      
      <a className="portfolio__content" href="https://github.com/mattino13" target="_blank" rel="noreferrer">
        <h2 className="portfolio__title">Статичный сайт</h2>
        <img className="portfolio__icon" src={portfolio} alt="стрелочка"/>
      </a>    
    
      <a className="portfolio__content" href="https://mattino13.github.io/russian-travel/" target="_blank" rel="noreferrer">
        <h2 className="portfolio__title">Адаптивный сайт</h2>
        <img className="portfolio__icon" src={portfolio} alt="стрелочка"/>
      </a>
      
      <a className="portfolio__content portfolio__content_none" href="https://mattino13.nomoredomains.monster" target="_blank" rel="noreferrer">
        <h2 className="portfolio__title">Одностраничное приложение</h2>
        <img className="portfolio__icon" src={portfolio} alt="стрелочка"/>
      </a>
     
    </section>
  )
}

export default Portfolio;