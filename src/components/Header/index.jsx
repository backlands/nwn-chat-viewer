import React from 'react';
import shallow from 'zustand/shallow';

import Badge from './Badge';

import useStore from '../../utilities/filtering';
import './styles.scss';

const Header = () => {
  const { search, setSearch } = useStore((state) => (
    { search: state.search, setSearch: state.setSearch }
  ), shallow);

  return (
    <div className="Header">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />

      <Badge />
    </div>
  );
};

export default Header;
