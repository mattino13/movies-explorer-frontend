import React from 'react';
import './AboutMe.css'

import aboutMe from '../../images/aboutMe-photo.jpg';

function AboutMe() {
  return (
    <section className="aboutMe">
      <h3 className="aboutMe__nav">Студент</h3>
      <div className="aboutMe__container">
        <div className="aboutMe__content">
          <h1 className="aboutMe__title">Виталий</h1>
          <p className="aboutMe__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutMe__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. 
                        У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
                        Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, 
                        как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с 
                        постоянной работы.</p>
          <p className="aboutMe__text_end">Github</p>
        </div>
        <img className="aboutMe__photo" src={aboutMe} alt="Фото студента"/>
      </div>

    </section>
  )
}

export default AboutMe;