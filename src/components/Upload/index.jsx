import React, { useEffect, useCallback, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

const Upload = ({
  label,
  onFileChange,
}) => {
  const fileInputField = useRef(null);
  const [file, setFile] = useState({});
  const [encoding, setEncoding] = useState('windows-1252');

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const readFile = useCallback((document, encode) => {
    const reader = new FileReader();

    // Closure to capture the file information.
    reader.addEventListener('load', (event) => {
      onFileChange(event.target.result);
    });

    // Read in the image file as a data URL.
    reader.readAsText(document, encode);
  }, [onFileChange]);

  useEffect(() => {
    if (file.size > 0) {
      readFile(file, encoding);
    }
  }, [encoding, readFile, file]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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

        <label htmlFor="encoding">
          <span>File Encoding</span>
          <select
            id="encoding"
            defaultValue={encoding}
            onChange={({ target: { value } }) => setEncoding(value)}
          >
            <option
              label="Windows 1252 (Default)"
              value="windows-1252"
            />
            <option label="UTF-8" value="utf8" />
          </select>
        </label>
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
