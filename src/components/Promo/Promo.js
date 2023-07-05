import React from 'react';
import './Promo.css'

import promo from '../../images/promo-logo.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <a className="promo__button" href="#aboutProject">Узнать больше</a>
      </div>
      <img className="promo__logo" src={promo} alt="Логотип проекта"/>
    </section>
  )
}

export default Promo;
