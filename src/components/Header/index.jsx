import React from 'react';

import Badge from './Badge';
import Names from './Names';
import Search from './Search';

import './styles.scss';

const Header = () => (
  <div className="Header">
    <Names />

    <Search />

    <Badge />
  </div>
);

export default Header;
