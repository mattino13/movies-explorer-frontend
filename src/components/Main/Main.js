import React from 'react';
import './Main.css';
import Promo from '../Promo/Promo.js';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';
import Portfolio from '../Portfolio/Portfolio.js';



function Main() {
  return (
    <main>
      <Promo></Promo>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
    </main>
  )
}

export default Main;