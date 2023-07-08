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
        <div className={`navigation ${isMenuOpened ? "navigation__overlay" : ""}`}>
          <div className={`navigation__menu ${isMenuOpened ? "navigation__menu-active" : ""}`}>
            {loggedIn && 
              <>
                {loggedIn && <img className="navigation__menubutton" onClick={() => setIsMenuOpened(!isMenuOpened)}
                  src={isMenuOpened ? menuButtonClose : menuButton} alt="Кнопка меню" />}
                  
                <nav className={`navigation__menu-items ${isMenuOpened ? "navigation__menu-items_active" : ""}`}>
                  <Link className="navigation__item navigation__item_main" to="/">Главная</Link>
                  <Link className="navigation__item navigation__item_line" to="/movies">Фильмы</Link>
                  <Link className="navigation__item navigation__item_none" to="/saved-movies">Сохранённые фильмы</Link>
                  <Link className="navigation__item navigation__item_profile" to="/profile">Аккаунт
                    <div className="navigation__icon">
                      <img src={navigationIcon} alt="Иконка аккаунта"/>
                    </div>
                  </Link>
                </nav>
              </>}

              {!loggedIn && 
                <>
                  <Link className="navigation__register" to="/sign-up">Регистрация</Link>
                  <button className="navigation__button" onClick={() => navigate('/sign-in')}>Войти</button>
                </>}
          </div>
        </div>
    </>
  )
}

export default Navigation;