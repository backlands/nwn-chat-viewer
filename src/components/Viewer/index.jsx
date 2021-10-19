import React, { useMemo } from 'react';

import Message from './Message';

import { destructureMessage, parseTell } from '../../utilities/parsing';
import { MESSAGE_REGEX } from '../../constants';
import './styles.scss';

const mergeableMessage = (message) => message.match(MESSAGE_REGEX);

const filterableMessage = (message) => {
  if (message === 'Unknown Update sub-message') return true;
  if (message.includes('nwsync:')) return true;
  if (message.includes('Error:')) return true;
  if (message.includes('GOG:')) return true;
  if (message.includes('Your cryptographic public identity ')) return true;
  if (message.includes('Game is using local port')) return true;
  if (message.includes('[CHAT WINDOW TEXT]')) return true;
  if (message === '*** ValidateGFFResource sent by user.') return true;
  return false;
};

const Viewer = ({ chatlog }) => {
  // Merges together all consecutive paragraphs of messages based on last visible
  // speaking method: Talk, Whisper, Shout, DM, Tell, Party.
  const parsedChatlog = useMemo(() => {
    if (chatlog) {
      return chatlog.split('\r\n').reduce((prev, curr) => {
        if (filterableMessage(curr)) return prev;

        const type = mergeableMessage(curr);

        if (!type) {
          const previousMessage = prev[prev.length - 1];
          previousMessage.content = `${previousMessage.content}\r\n${curr}`;

          return [...prev];
        }

        switch (type[1]) {
          case 'Tell':
            return [...prev, parseTell(curr)];

          default:
            return [...prev, destructureMessage(curr)];
        }
      }, []);
    }

    return false;
  }, [chatlog]);

  if (parsedChatlog) {
    return (
      <div className="Viewer">
        {parsedChatlog.map((message, index) => <Message key={index} message={message} />)}
      </div>
    );
  }

  return null;
};

export default Viewer;
