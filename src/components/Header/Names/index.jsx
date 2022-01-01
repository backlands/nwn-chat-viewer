import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faMinus } from '@fortawesome/free-solid-svg-icons';

import useStore from '../../../utilities/filtering';

import './styles.scss';

const Names = () => {
  const { names, addName, removeName } = useStore((state) => (
    { names: state.names, addName: state.addName, removeName: state.removeName }
  ), shallow);

  const [input, setInput] = useState('');
  const [addNew, setAddNew] = useState(false);

  const handleEnter = (e) => {
    const keyCode = e.code || e.key;
    if (keyCode === 'Enter') {
      addName(e.target.value);

      setInput('');
    }
  };

  return (
    <div className="Names">
      <button
        className="toggle"
        type="button"
        onClick={() => setAddNew(!addNew)}
      >
        <span>Filter by name / player</span>

        <FontAwesomeIcon
          icon={addNew ? faChevronUp : faChevronDown}
          type="button"
        />
      </button>

      { names.length > 0 && (
        <div className="chips">
          {names.map((name, index) => (
            <button type="button" className="chip" onClick={() => removeName(index)}>
              {name}
              <FontAwesomeIcon icon={faMinus} type="button" />
            </button>
          ))}
        </div>
      )}

      { addNew && (
        <input
          className="addName"
          placeholder="Enter to submit..."
          type="text"
          value={input}
          onKeyPress={handleEnter}
          onChange={(e) => setInput(e.target.value)}
        />
      )}
    </div>
  );
};

export default Names;
