import React from 'react';
import shallow from 'zustand/shallow';

import useStore from '../../../utilities/filtering';
import PORTRAIT from '../../../assets/blank_portrait.jpg';
import './styles.scss';

const Message = ({ message, portrait }) => {
  const { portrait: hidePortrait, language: hideLanguage } = useStore((state) => ({
    portrait: state.portrait,
    language: state.language,
  }), shallow);
  const { username, character, type, language, content } = message;

  return (
    <div className="Message">
      {portrait && !hidePortrait && (
        <div className="portrait">
          <img alt={username || character} title={username || character} src={PORTRAIT} />
        </div>
      )}

      <div className="content">
        <p className="character">{character || username}</p>

        {content.split('\r\n').map((text, index) => (
          <p key={index} className={type ? type.toLowerCase() : undefined}>
            {type && index === 0 && (
              <span className={`type ${type.toLowerCase()}`}>{`[${type}] `}</span>
            )}

            {!hideLanguage && language.name && (
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
