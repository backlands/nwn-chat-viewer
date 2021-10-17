import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

const Upload = ({
  label,
  onFileChange,
}) => {
  const fileInputField = useRef(null);
  const [file, setFile] = useState({});

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const readFile = (document) => {
    const reader = new FileReader();

    // Closure to capture the file information.
    reader.addEventListener('load', (event) => {
      onFileChange(event.target.result);
    });

    // Read in the image file as a data URL.
    reader.readAsText(document, 'windows-1252');
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    readFile(event.target.files[0]);
  };

  const removeCurrentFile = () => {
    setFile({});
    onFileChange(undefined);
  };

  return (
    <div className="Upload">
      <section className="uploader">
        <label htmlFor="upload">{label}</label>
        <button type="button" onClick={handleUploadBtnClick}>
          <FontAwesomeIcon icon={faFileUpload} size="3x" />
          <span>load chatlog</span>
        </button>

        <input
          id="upload"
          type="file"
          onChange={handleFileChange}
          title=""
          multiple={false}
          value=""
          ref={fileInputField}
        />
      </section>

      {
        file?.name && (
          <article className="currentFile">
            <h4>Current chat log:</h4>

            <section>
              <span>{file.name}</span>
              <FontAwesomeIcon icon={faTrashAlt} onClick={removeCurrentFile} size="lg" />
            </section>
          </article>
        )
      }
    </div>
  );
};

export default Upload;
