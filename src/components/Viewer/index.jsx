import React, { useMemo } from 'react';

import Message from './Message';

import { destructureMessage, parseConversation } from '../../utilities/parsing';
import { MESSAGE_REGEX } from '../../constants';
import './styles.scss';

const mergeableMessage = (message) => {
  const search = message.match(MESSAGE_REGEX);

  return search === null ? false : search[1];
};

const filterableMessage = (message) => {
  if (message === 'Unknown Update sub-message') return true;
  if (message.includes('nwsync:')) return true;
  if (message.includes('Error:')) return true;
  if (message.includes('GOG:')) return true;
  if (message.includes('Your cryptographic public identity')) return true;
  if (message.includes('Game is using local port')) return true;
  if (message.includes('ValidateGFFResource')) return true;
  if (message === '') return true;
  return false;
};

const Viewer = ({ chatlog }) => {
  // Merges together all consecutive paragraphs of messages based on last visible
  // speaking method: Talk, Whisper, Shout, DM, Tell, Party.
  const parsedChatlog = useMemo(() => {
    if (chatlog) {
      return chatlog.split('\r\n').reduce((prev, curr) => {
        const filter = filterableMessage(curr);
        const previousMessage = prev.length - 1 >= 0 ? prev[prev.length - 1] : false;
        const type = mergeableMessage(curr);

        if (filter) return prev;

        if (!type && previousMessage) {
          previousMessage.content = `${previousMessage?.content}\r\n${curr}`;

          return prev;
        }

        switch (type) {
          case 'CHAT WINDOW TEXT':
            return prev;

          case 'Talk':
          case 'Whisper':
          case 'Shout':
          case 'Tell':
            return [...prev, parseConversation(curr, type)];

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
