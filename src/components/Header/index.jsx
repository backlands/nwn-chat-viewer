import React from 'react';

import Badge from './Badge';
import Toggles from './Toggles';
import Names from './Names';
import Search from './Search';

import './styles.scss';

const Header = () => (
  <div className="Header">
    <Names />

    <Search />

    <Toggles />

    <Badge />
  </div>
);

export default Header;
