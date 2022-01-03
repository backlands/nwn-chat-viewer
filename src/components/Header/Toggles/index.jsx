import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faSquare,
  faCheckSquare,
} from '@fortawesome/free-solid-svg-icons';

import useStore from '../../../utilities/filtering';
import './styles.scss';

const Toggles = () => {
  const [open, setOpen] = useState(false);
  const {
    tell, toggleTell,
    system, toggleSystem,
    portrait, togglePortrait,
    language, toggleLanguage,
  } = useStore((state) => ({
    tell: state.tell,
    toggleTell: state.toggleTell,
    system: state.system,
    toggleSystem: state.toggleSystem,
    portrait: state.portrait,
    togglePortrait: state.togglePortrait,
    language: state.language,
    toggleLanguage: state.toggleLanguage,
  }), shallow);

  return (
    <div className="Toggles">
      <button className="toggle" type="button" onClick={() => setOpen(!open)}>
        <span>Filters</span>

        <FontAwesomeIcon
          icon={open ? faChevronUp : faChevronDown}
          type="button"
        />
      </button>

      { open && (
        <div className="dropdown">
          <button type="button" onClick={toggleTell}>
            <input className="toggle" type="checkbox" selected={tell} />

            <FontAwesomeIcon
              size="lg"
              icon={tell ? faCheckSquare : faSquare}
              type="button"
            />
            <span>Hide Tells</span>
          </button>

          <button type="button" onClick={toggleSystem}>
            <input className="toggle" type="checkbox" selected={system} />

            <FontAwesomeIcon
              size="lg"
              icon={system ? faCheckSquare : faSquare}
              type="button"
            />
            <span>Hide System Messages</span>
          </button>

          <button type="button" onClick={togglePortrait}>
            <input className="toggle" type="checkbox" selected={portrait} />

            <FontAwesomeIcon
              size="lg"
              icon={portrait ? faCheckSquare : faSquare}
              type="button"
            />
            <span>Hide Portraits</span>
          </button>

          <button type="button" onClick={toggleLanguage}>
            <input className="toggle" type="checkbox" selected={language} />

            <FontAwesomeIcon
              size="lg"
              icon={language ? faCheckSquare : faSquare}
              type="button"
            />
            <span>Hide Language Info</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Toggles;
