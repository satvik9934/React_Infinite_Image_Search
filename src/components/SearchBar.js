import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  const isSearchButtonEnabled = searchTerm.length >= 3;

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search images..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch} disabled={!isSearchButtonEnabled}>
        Search
      </button>
      <button onClick={handleClear} disabled={!searchTerm}>
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
