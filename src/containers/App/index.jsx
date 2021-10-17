import React, { useState } from 'react';

import Upload from '../../components/Upload';
import Viewer from '../../components/Viewer';

import './styles.scss';

export default () => {
  const [file, setFile] = useState(undefined);

  const classes = file ? 'App viewing' : 'App';

  return (
    <div className={classes}>
      <Viewer chatlog={file} />

      <Upload onFileChange={setFile} />

      <span className="notice">
        No files are saved or uploaded on this site.
        <br />
        All log parsing is handled locally in your browser.
        <br />
        All data is stored in a temporary session in your browser.
      </span>
    </div>
  );
};
