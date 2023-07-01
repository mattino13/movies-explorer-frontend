import React from 'react';
import './Portfolio.css'

import portfolio from '../../images/portfolio-icon.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__subtitle">Портфолио</p>
      <div className="portfolio__content">
        <h2 className="portfolio__title">Статичный сайт</h2>
        <img className="portfolio__icon" src={portfolio} alt="стрелочка"/>
      </div>
      <div className="portfolio__content">
        <h2 className="portfolio__title">Адаптивный сайт</h2>
        <img className="portfolio__icon" src={portfolio} alt="стрелочка"/>
      </div>
      <div className="portfolio__content portfolio__content_none">
        <h2 className="portfolio__title">Одностраничное приложение</h2>
        <img className="portfolio__icon" src={portfolio} alt="стрелочка"/>
      </div>
    </section>
  )
}

export default Portfolio;