import React from 'react';

import PORTRAIT from '../../../assets/blank_portrait.jpg';
import './styles.scss';

const Message = ({ message }) => {
  console.log(message);
  const { username, character, type, language: [language, color], content } = message;

  return (
    <div className="Message">
      <div className="portrait">
        <img alt={username || character} title={username || character} src={PORTRAIT} />
      </div>

      <div className="content">
        <p className="character">{character || username}</p>

        {content.split('\r\n').map((text, index) => (
          <p key={index} className={type.toLowerCase()}>
            {language && index === 0 && (
              <span style={{ color: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}>
                {`${language}: `}
              </span>
            )}

            <span className={`type ${type.toLowerCase()}`}>{`[${type}] `}</span>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Message;
