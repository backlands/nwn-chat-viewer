import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './styles.scss';

const Badge = () => (
  <a
    className="Badge"
    href="https://github.com/backlands/nwn-chat-viewer"
    target="_blank"
    rel="noreferrer"
  >
    <FontAwesomeIcon
      icon={faGithub}
    />
    View on GitHub
  </a>
);

export default Badge;
