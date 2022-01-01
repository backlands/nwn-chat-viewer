import React, { useCallback, useState } from 'react';
import shallow from 'zustand/shallow';

import Message from '../Message';

import useStore from '../../../utilities/filtering';
import './styles.scss';

const Log = ({ chatlog, portraits, title }) => {
  const { search, names } = useStore((state) => (
    { search: state.search, names: state.names }
  ), shallow);
  const [visible, setVisible] = useState(true);

  const toggleLog = useCallback(
    () => {
      setVisible(!visible);
    },
    [visible],
  );

  const checkFilters = ({ username, character, content }) => (
    content.toLowerCase().includes(search.toLowerCase())
      && (names.includes(username) || names.includes(character))
  );

  const filteredLog = search || names.length > 0 ? chatlog.filter(checkFilters) : [...chatlog];

  return (
    <div className="Log">
      <button type="button" className="title" onClick={toggleLog}>{title}</button>

      { filteredLog.length > 0 && (
        <section className={visible ? 'visible' : undefined}>
          {filteredLog.map(
            (message, index) => <Message portrait={portraits} key={index} message={message} />,
          )}
        </section>
      )}
    </div>
  );
};

export default Log;
