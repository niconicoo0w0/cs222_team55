const SearchBar = function () {
    return (
      <form className="searchBar" action="/" method="get">
          <label className="searchBarLabel" htmlFor="header-search">
              <span className="visually-hidden">
                  <div className="setHover">B</div>
                  <div className="setHover">o</div>
                  <div className="setHover">o</div>
                  <div className="setHover">k</div>
                  <div className="setHover">s &nbsp;</div>
                  <div className="setHover">f</div>
                  <div className="setHover">o</div>
                  <div className="setHover">r &nbsp;</div>
                  <div className="setHover">E</div>
                  <div className="setHover">v</div>
                  <div className="setHover">e</div>
                  <div className="setHover">r</div>
                  <div className="setHover">y</div>
                  <div className="setHover">o</div>
                  <div className="setHover">n</div>
                  <div className="setHover">e</div>
                  <div className="setHover">!</div>
                </span>
          </label>
          <input className="searchBarInput"
              type="text"
              name="s" 
          />
          <button className="searchBarButton" type="submit">Search</button>
      </form>
    )
  }

  export default SearchBar;