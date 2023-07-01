import React from 'react';

import './Profile.css'

function Profile({ onLogout, onEditProfile }) {
  function handleSubmit(e) {
    e.preventDefault();
  
    onEditProfile();
  }

  return (
    <div className="profile">
      <h3 className="profile__tittle">Привет, Виталий!</h3>

      <form onSubmit={handleSubmit}>
        <div className="profile__container">
          <label htmlFor="userName" className="profile__text">Имя</label>
          <input id="userName" minLength={2} maxLength={30} required
            className="profile__item" placeholder="Виталий" />
        </div>
        <div className="profile__container profile__container_none">
          <label htmlFor="email" className="profile__text">E-mail</label>
          <input id="email" required type="email"
            className="profile__item" placeholder="pochta@yandex.ru" />
        </div>

        <button type="submit" className="profile__subtitle">Редактировать</button>
      </form>

      <p onClick={onLogout} className="profile__subtitle profile__subtitle_color">Выйти из аккаунта</p>   
    </div>
  )

}

export default Profile;