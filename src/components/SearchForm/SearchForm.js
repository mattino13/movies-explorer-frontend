import React from 'react';
import './SearchForm.css'




function SearchForm({ onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
  
    onSearch();
  }

  return (
    <section className="searchForm">
      <form onSubmit={handleSubmit} className="searchForm__form">
      
        <input type="search" className="searchForm__item" placeholder="Фильм" />
        <button type="submit" className="searchForm__button" />
      
        <label className="searchForm__checkboxContainer">
          <input className="searchForm__checkbox" type="checkbox" id="switch" />
          <span className="searchForm__checkboxSpan"/>

        Короткометражки</label>

      </form>
     
    </section>
 )
}


export default SearchForm;