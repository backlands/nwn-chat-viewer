import React, { useMemo } from 'react';

import Log from './Log';

import {
  destructureMessage,
  parseConversation,
  parseChatLog,
  mergeableMessage,
  filterableMessage,
} from '../../utilities/parsing';
import './styles.scss';

const Viewer = ({ chatlog }) => {
  // Merges together all consecutive paragraphs of messages based on last visible
  // speaking method: Talk, Whisper, Shout, DM, Tell, Party.
  const parsedChatlog = useMemo(() => {
    if (chatlog) {
      const LINE_ENDINGS = chatlog.match('\r\n') ? '\r\n' : '\n';

      return chatlog.split(LINE_ENDINGS).reduce(({ dialog, combat, lastType }, curr) => {
        const filter = filterableMessage(curr, LINE_ENDINGS);
        const type = mergeableMessage(curr);

        let previousMessage;

        if (lastType === 'dialog') {
          previousMessage = dialog.length - 1 >= 0 ? dialog[dialog.length - 1] : false;
        } else {
          previousMessage = combat.length - 1 >= 0 ? combat[combat.length - 1] : false;
        }

        if (filter) return { dialog, combat, lastType };

        if (!type && previousMessage) {
          previousMessage.content = `${previousMessage?.content}\r\n${curr}`;

          return { dialog, combat, lastType };
        }

        switch (type) {
          case 'CHAT WINDOW TEXT':
            return {
              dialog,
              combat: [...combat, parseChatLog(curr)],
              lastType: 'combat',
            };

          case 'Talk':
          case 'Whisper':
          case 'Shout':
          case 'Tell':
            return {
              dialog: [...dialog, parseConversation(curr, type)],
              combat,
              lastType: 'dialog',
            };

          default:
            return {
              dialog: [...dialog, destructureMessage(curr)],
              combat,
              lastType: 'dialog',
            };
        }
      }, { dialog: [], combat: [], lastType: undefined });
    }

    return false;
  }, [chatlog]);

  if (parsedChatlog) {
    return (
      <div className="Viewer">
        <Log title="Chat Log" portraits chatlog={parsedChatlog.dialog} />
        <Log title="Gameplay Log" chatlog={parsedChatlog.combat} />
      </div>
    );
  }

  return null;
};

export default Viewer;
