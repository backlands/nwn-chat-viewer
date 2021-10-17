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
    </div>
  );
};
