import React from 'react';

import portrait from './blank_portrait.jpg';
import './styles.scss';

// const COLOR_START_REGEX = /(<c[^>]*>)/;
// const COLOR_END_REGEX = /(<c\/>)/;
// const COLOR_KEYS_REGEX = /<c(.)(.)(.)>/;
const MESSAGE_REGEX = /(\[Talk\]|\[Whisper\]|\[Shout\]|\[DM\]|\[Tell\]\[Party\])/;

const addColor = (message) => {
  let colored = message;

  colored = colored.replace(/^(\[[^\]]*\])/, '<span class="username">$1</span><span class="character">');
  colored = colored.replace(MESSAGE_REGEX, '</span><span class="type">$1</span>');

  return colored;
};

const Message = ({ message }) => (
  <div className="Message">
    <div className="portrait">
      <img alt="Portrait for user" src={portrait} />
    </div>

    <div className="content">
      {message.split('\r\n').map((text, index) => (
        <p
          key={index}
          dangerouslySetInnerHTML={{ __html: addColor(text) }}
        />
      ))}
    </div>
  </div>
);

export default Message;
