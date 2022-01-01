import React, { useState } from 'react';
import shallow from 'zustand/shallow';

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
      <span>Filter by name / player</span>

      { names.length > 0 && (
        <div className="chips">
          {names.map((name, index) => (
            <span className="chip">
              {name}
              <button
                type="button"
                onClick={() => removeName(index)}
              >
                -
              </button>
            </span>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setAddNew(!addNew)}
      >
        {addNew ? '-' : '+'}
      </button>

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
