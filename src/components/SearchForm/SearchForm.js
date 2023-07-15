import React from 'react';
import './SearchForm.css'

function SearchForm({ onSearch, viewMode }) {
  const [searchString, setSearchString] = React.useState('');
  const [onlyShortMovies, setOnlyShortMovies] = React.useState(false);

  React.useEffect(() => {
    if (viewMode === "allMovies") {
      const moviesSearchData = localStorage.getItem('MoviesSearchData');
      
      if (moviesSearchData) {
        const parsedSearchData = JSON.parse(moviesSearchData)
        setSearchString(parsedSearchData.searchString);
        setOnlyShortMovies(parsedSearchData.onlyShortMovies);
      }
    }
  }, []); 

  function handleSubmit(e) {
    e.preventDefault();
  
    onSearch(searchString, onlyShortMovies);
  }

  function handleCheckboxChange(e) {
    setOnlyShortMovies(e.target.checked);
  }

  function handleTextInputChange(e) {
    setSearchString(e.target.value);
  }

  return (
    <section className="searchForm">
      <form onSubmit={handleSubmit} className="searchForm__form">
      
        <input type="search" className="searchForm__item" placeholder="Фильм" value={searchString} onChange={handleTextInputChange}/>
        <button type="submit" className="searchForm__button" />
      
        <label className="searchForm__checkbox-container">
          <input className="searchForm__checkbox" type="checkbox" id="switch" checked={onlyShortMovies} onChange={handleCheckboxChange}/>
          <span className="searchForm__checkbox-span"/>Короткометражки
        </label>

      </form>
     
    </section>
 )
}


export default SearchForm;