import React from 'react';
import shallow from 'zustand/shallow';

import useStore from '../../../utilities/filtering';

const Search = () => {
  const { search, setSearch } = useStore((state) => (
    { search: state.search, setSearch: state.setSearch }
  ), shallow);

  return (
    <input
      className="Search"
      placeholder="Search chatlog..."
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default Search;
