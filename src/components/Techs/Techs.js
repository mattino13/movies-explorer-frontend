import React from 'react';
import './Techs.css'


function Techs() {
  return (
    <section className="techs">
      <h3 className="techs__nav">Технологии</h3>
      <h1 className="techs__title">7 технологий</h1>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className="techs__icons">
        <p className="techs__text techs__text_icon">HTML</p>
        <p className="techs__text techs__text_icon">CSS</p>
        <p className="techs__text techs__text_icon">JS</p>
        <p className="techs__text techs__text_icon">React</p>
        <p className="techs__text techs__text_icon">Git</p>
        <p className="techs__text techs__text_icon">Express.js</p>
        <p className="techs__text techs__text_icon">mongoDB</p>
      </div>
    </section>
  )
}

export default Techs;