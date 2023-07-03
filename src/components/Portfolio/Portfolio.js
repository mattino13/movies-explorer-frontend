import React from 'react';
import './Portfolio.css'

import portfolio from '../../images/portfolio-icon.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__subtitle">Портфолио</p>
      <div className="portfolio__content">
        <h2 className="portfolio__title">Статичный сайт</h2>
        <a className="footer__link" href="https://github.com/mattino13" target="_blank" rel="noreferrer">
          <img className="portfolio__icon" src={portfolio} alt="стрелочка"/>
        </a>
      </div>
      <div className="portfolio__content">
        <h2 className="portfolio__title">Адаптивный сайт</h2>
        <a className="footer__link" href="https://mattino13.github.io/russian-travel/" target="_blank" rel="noreferrer">
          <img className="portfolio__icon" src={portfolio} alt="стрелочка"/>
        </a>
      </div>
      <div className="portfolio__content portfolio__content_none">
        <h2 className="portfolio__title">Одностраничное приложение</h2>
        <a className="footer__link" href="https://mattino13.nomoredomains.monster" target="_blank" rel="noreferrer">
          <img className="portfolio__icon" src={portfolio} alt="стрелочка"/>
        </a>
      </div>
    </section>
  )
}

export default Portfolio;