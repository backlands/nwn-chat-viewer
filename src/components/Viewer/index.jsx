import React from 'react';

import Message from './Message';

import './styles.scss';

const chatlog = localStorage.getItem('currentFile').split('\r\n');

const MESSAGE_REGEX = /\[Talk\]|\[Whisper\]|\[Shout\]|\[DM\]|\[Tell\]\[Party\]/;

const mergeableMessage = (message) => !message.match(MESSAGE_REGEX);

const filterableMessage = (message) => {
  if (message === 'Unknown Update sub-message') return true;
  if (message.includes('nwsync:')) return true;
  if (message.includes('Error:')) return true;
  if (message.includes('GOG:')) return true;
  if (message.includes('Sent to DM:')) return true;
  if (message.includes('Your cryptographic public identity ')) return true;
  if (message.includes('Game is using local port')) return true;
  if (message === '*** ValidateGFFResource sent by user.') return true;
  return false;
};

const Viewer = () => {
  // Merges together all consecutive paragraphs of messages based on last visible
  // speaking method: Talk, Whisper, Shout, DM, Tell, Party.
  const mergedChatlog = chatlog.reduce((prev, curr) => {
    if (filterableMessage(curr)) return prev;

    if (mergeableMessage(curr)) {
      prev[prev.length - 1] = `${prev[prev.length - 1]}\r\n${curr}`;

      return [...prev];
    }

    return [...prev, curr];
  }, []);

  // Filtered logs to remove NPC messages (player responses are still visible)
  const playerMessagesChatlog = mergedChatlog.filter((message) => {
    if (message.startsWith('[')) return true;
    return false;
  });

  return (
    <div className="Viewer">
      {playerMessagesChatlog.map((message, index) => <Message key={index} message={message} />)}
    </div>
  );
};

export default Viewer;
