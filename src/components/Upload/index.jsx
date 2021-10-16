import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const KILOBYTES_PER_BYTE = 1024;

const convertBytesToKB = (bytes) => Math.round(bytes / KILOBYTES_PER_BYTE);

const Upload = ({
  label,
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
      localStorage.setItem('currentFile', event.target.result);
    });

    // Read in the image file as a data URL.
    reader.readAsText(document);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    readFile(event.target.files[0]);
  };

  return (
    <>
      <section>
        <label htmlFor="upload">{label}</label>
        <p>Drag and drop your files anywhere or</p>

        <button type="button" onClick={handleUploadBtnClick}>
          <FontAwesomeIcon icon={faFileUpload} />
          <span>Upload a chat log...</span>
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

      <article>
        <span>Current chat log:</span>

        <section>
          <div>
            <span>{file.name}</span>
            <aside>
              <span>{`${convertBytesToKB(file.size)} kb`}</span>

              <FontAwesomeIcon icon={faTrashAlt} />
            </aside>
          </div>
        </section>
      </article>
    </>
  );
};

export default Upload;
