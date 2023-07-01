import React from 'react';
import './Navigation.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';

import navigationIcon from '../../images/navigation-icon.svg';
import menuButton from '../../images/menubutton.svg';
import menuButtonClose from '../../images/menubuttonclose.svg';

function Navigation({ loggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);

  // при переходе на другую страницу закрываем меню
  React.useEffect(() => setIsMenuOpened(false), [location]);

  return (
      <>
        <nav className={`navigation ${isMenuOpened ? "navigation_menuActive" : ""}`}>
          {loggedIn && 
            <>
              {loggedIn && <img className="navigation__menubutton" onClick={() => setIsMenuOpened(!isMenuOpened)}
                 src={isMenuOpened ? menuButtonClose : menuButton} alt="Кнопка меню" />}
                 
              <div className={`navigation__menuItems ${isMenuOpened ? "navigation__menuItems_menuActive" : ""}`}>
                <Link className="navigation__movies navigation__movies_main" to="/">Главная</Link>
                <Link className="navigation__movies" to="/movies">Фильмы</Link>
                <Link className="navigation__movies navigation__movies_none" to="/saved-movies">Сохранённые фильмы</Link>
                <Link className="navigation__movies navigation__profile" to="/profile">Аккаунт
                  <div className="navigation__icon">
                    <img src={navigationIcon} alt="Иконка аккаунта"/>
                  </div>
                </Link>
              </div>
            </>}

          {!loggedIn && 
            <>
              <Link className="navigation__register" to="/sign-up">Регистрация</Link>
              <button className="navigation__button" onClick={() => navigate('/sign-in')}>Войти</button>
            </>}
        </nav>
    </>
  )
}

export default Navigation;