import React from 'react';

import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__content">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <nav>
          <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer"> Яндекс.Практикум </a>
          <a className="footer__link" href="https://github.com/mattino13" target="_blank" rel="noreferrer">Github</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;