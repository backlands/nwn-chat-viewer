import React, { useCallback, useState } from 'react';
import useStore from '../../../utilities/filtering';

import Message from '../Message';

import './styles.scss';

const Log = ({ chatlog, portraits, title }) => {
  const search = useStore((state) => state.search);
  const [visible, setVisible] = useState(true);

  const toggleLog = useCallback(
    () => {
      setVisible(!visible);
    },
    [visible],
  );

  const filteredLog = search
    ? chatlog.filter(({ content }) => content.toLowerCase().includes(search.toLowerCase()))
    : [...chatlog];

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
