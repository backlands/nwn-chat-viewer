import React, { useMemo } from 'react';

import Message from './Message';

import { MESSAGE_REGEX } from '../../constants';
import './styles.scss';

const mergeableMessage = (message) => !message.match(MESSAGE_REGEX);

const filterableMessage = (message) => {
  if (message === 'Unknown Update sub-message') return true;
  if (message.includes('nwsync:')) return true;
  if (message.includes('Error:')) return true;
  if (message.includes('GOG:')) return true;
  if (message.includes('Sent to DM:')) return true;
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

        if (mergeableMessage(curr)) {
          prev[prev.length - 1] = `${prev[prev.length - 1]}\r\n${curr}`;

          return [...prev];
        }

        return [...prev, curr];
      }, []).filter((message) => {
        // Filters logs to remove NPC messages (player responses are still visible)
        if (message.startsWith('[')) return true;
        return false;
      });
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
