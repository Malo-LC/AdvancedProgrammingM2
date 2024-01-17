import { useState } from "react";

//style
import "./searchbar.css";
import search from "../../../assets/images/icons/search.png";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  //   if(searchInput.length > 0) {

  //   }

  return (
    <div className="searchbar">
      <input className="input-searchbar" placeholder="Recherche de documents..." onChange={handleChange} value={searchInput} />
      <button>
        <img className="search-icon-right" src={search} />
      </button>
    </div>
  );
}

export default SearchBar;
