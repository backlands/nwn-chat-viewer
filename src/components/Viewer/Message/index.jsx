import React from 'react';

import PORTRAIT from '../../../assets/blank_portrait.jpg';
import './styles.scss';

const Message = ({ message, portrait }) => {
  const { username, character, type, language, content } = message;

  return (
    <div className="Message">
      {portrait && (
        <div className="portrait">
          <img alt={username || character} title={username || character} src={PORTRAIT} />
        </div>
      )}

      <div className="content">
        <p className="character">{character || username}</p>

        {content.split('\r\n').map((text, index) => (
          <p key={index} className={type ? type.toLowerCase() : false}>
            {type && (
              <span className={`type ${type.toLowerCase()}`}>{`[${type}] `}</span>
            )}

            {language.name && (
              <span style={{ color: `rgb(${language.color[0]}, ${language.color[1]}, ${language.color[2]})` }}>
                {`[${language.name}]: `}
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
