import React from 'react';
import { destructureMessage } from '../../../utilities/parsing';

import PORTRAIT from '../../../assets/blank_portrait.jpg';
import './styles.scss';

const Message = ({ message }) => {
  const [username, character, type, [language, color], content] = destructureMessage(message);

  return (
    <div className="Message">
      <div className="portrait">
        <img alt={username[1]} title={username[1]} src={PORTRAIT} />
      </div>

      <div className="content">
        <p className="character">{character}</p>

        {content.split('\r\n').map((text, index) => (
          <p key={index} className={type.toLowerCase()}>
            <span className={`type ${type.toLowerCase()}`}>{`[${type}] `}</span>

            {language && (
              <span style={{ color: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}>
                {`${language}: `}
              </span>
            )}
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Message;
