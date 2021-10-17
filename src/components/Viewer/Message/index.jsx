import React from 'react';

import {
  COLOR_END_REGEX,
  COLOR_KEYS_REGEX,
  MESSAGE_REGEX,
  NWN_COLOR_TABLE,
} from '../../../constants';

import PORTRAIT from '../../../assets/blank_portrait.jpg';
import './styles.scss';

const ASCII_TO_NUMBER = (character) => {
  let value = character.charCodeAt(0);

  if (value > 255) {
    const index = Object.values(NWN_COLOR_TABLE).findIndex((current) => (current === character));
    value = index >= 0 ? index : value;
  }

  return value >= 0 && value <= 255 ? value : 252;
};

const MATCHES_TO_STYLE = (_, r, g, b) => (
  `<span style="color: rgb(${ASCII_TO_NUMBER(r)}, ${ASCII_TO_NUMBER(g)}, ${ASCII_TO_NUMBER(b)})">`
);

const parseMessage = (message) => {
  let parsed = message;

  parsed = parsed.replace(COLOR_KEYS_REGEX, MATCHES_TO_STYLE);

  parsed = parsed.replace(/^\[[^\]]*\]/, '<span class="character">');
  parsed = parsed.replace(MESSAGE_REGEX, '</span><br />');
  parsed = parsed.replace(COLOR_END_REGEX, '</span>');

  return parsed;
};

const Message = ({ message }) => {
  const username = message.match(/^\[([^\]]*)\]/);

  return (
    <div className="Message">
      <div className="portrait">
        <img alt={username[1]} title={username[1]} src={PORTRAIT} />
      </div>

      <div className="content">
        {message.split('\r\n').map((text, index) => (
          <p
            key={index}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: parseMessage(text) }}
          />
        ))}
      </div>
    </div>
  );
};

export default Message;
