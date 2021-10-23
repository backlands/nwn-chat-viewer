import React, { useCallback, useState } from 'react';

import Message from '../Message';

import './styles.scss';

const Log = ({ chatlog, portraits, title }) => {
  const [visible, setVisible] = useState(true);

  const toggleLog = useCallback(
    () => {
      setVisible(!visible);
    },
    [visible],
  );

  return (
    <div className="Log">
      <button type="button" className="title" onClick={toggleLog}>{title}</button>

      { chatlog.length > 0 && (
        <section className={visible ? 'visible' : undefined}>
          {chatlog.map(
            (message, index) => <Message portrait={portraits} key={index} message={message} />,
          )}
        </section>
      )}
    </div>
  );
};

export default Log;
