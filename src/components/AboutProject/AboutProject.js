import React from 'react';
import './AboutProject.css'


function AboutProject() {
  return (
    <section className="aboutProject" id="aboutProject">
      <h3 className="aboutProject__nav">О проекте</h3>
      <div className="aboutProject__content">
        <p className="aboutProject__subtitle">Дипломный проект включал 5 этапов</p>
        <p className="aboutProject__subtitle aboutProject__subtitle_shift">На выполнение диплома ушло 5 недель</p>
        <p className="aboutProject__text">Составление плана, работу над бэкендом, 
                      вёрстку, добавление функциональности и финальные доработки.</p>
        <p className="aboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, 
                      которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="aboutProject__content aboutProject__content-table">
        <p className="aboutProject__text aboutProject__text_table aboutProject__text_green">1 неделя</p>
        <p className="aboutProject__text aboutProject__text_table aboutProject__text_grey">4 недели</p>
        <p className="aboutProject__text aboutProject__text_table aboutProject__text_end">Back-end</p>
        <p className="aboutProject__text aboutProject__text_table aboutProject__text_end">Front-end</p>


      </div>
      
    </section>
  )
}

export default AboutProject;