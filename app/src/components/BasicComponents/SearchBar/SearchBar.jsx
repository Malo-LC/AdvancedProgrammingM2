//style
import { Search } from "react-feather";
import "./searchbar.css";

import PropTypes from "prop-types";

function SearchBar({ searchInput, setSearchInput }) {
  return (
    <div className="searchbar">
      <input
        className="input-searchbar"
        placeholder="Recherche de documents..."
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      />
      <Search className="search-icon-right" />
    </div>
  );
}

SearchBar.propTypes = {
  searchInput: PropTypes.string.isRequired,
  setSearchInput: PropTypes.func.isRequired,
};

export default SearchBar;
