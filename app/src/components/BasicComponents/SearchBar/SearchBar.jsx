//style
import search from "../../../assets/images/icons/search.png";
import "./searchbar.css";

import PropTypes from "prop-types";

function SearchBar({ searchInput, setSearchInput }) {
  const handleChange = (e) => {
    const value = e.target.value;
    e.preventDefault();
    setSearchInput(value);
  };

  return (
    <div className="searchbar">
      <input className="input-searchbar" placeholder="Recherche de documents..." onChange={handleChange} value={searchInput} />
      <button>
        <img className="search-icon-right" src={search} />
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  searchInput: PropTypes.string.isRequired,
  setSearchInput: PropTypes.func.isRequired,
};

export default SearchBar;
