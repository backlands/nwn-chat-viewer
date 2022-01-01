import React, { useCallback, useMemo, useState, useRef } from 'react';
import shallow from 'zustand/shallow';
import { jsPDF as JSPDF } from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import Roboto from './Roboto-Slab-normal';
import Message from '../Message';

import useStore from '../../../utilities/filtering';
import './styles.scss';

const Log = ({ chatlog, portraits, title }) => {
  const { search, names } = useStore((state) => (
    { search: state.search, names: state.names }
  ), shallow);

  const [visible, setVisible] = useState(true);
  const logInstance = useRef(null);
  const [exporting, setExporting] = useState(false);

  const toggleLog = useCallback(
    () => {
      setVisible(!visible);
    },
    [visible],
  );

  const filteredLog = useMemo(() => {
    const checkFilters = ({ username, character, content }) => (
      content.toLowerCase().includes(search.toLowerCase())
        && (names.includes(username) || names.includes(character))
    );

    return search || names.length > 0 ? chatlog.filter(checkFilters) : [...chatlog];
  }, [chatlog, names, search]);

  const runExport = useCallback(
    () => {
      setExporting(true);
      // Default export is a4 paper, portrait, using millimeters for units
      const doc = new JSPDF();

      doc.addFileToVFS('Roboto-Slab.ttf', Roboto);
      doc.addFont('Roboto-Slab.ttf', 'Roboto Slab', 'normal');

      doc.setFont('Roboto Slab', 'normal', 'normal');

      // TODO: Exports are way to big currently, need to find a good way to rescale for PDF
      doc.html(logInstance.current, {
        callback: (pdf) => {
          pdf.save(`chatlog-${new Date()}`);
          setExporting(false);
        },
        width: 220,
        windowWidth: 600,
        autoPaging: 'slice',
        html2canvas: {
          backgroundColor: '#222222',
          windowWidth: logInstance.current.scrollWidth,
        },
      });
    },
    [logInstance],
  );

  const contents = useMemo(() => (
    filteredLog.length > 0 && (
      <section ref={logInstance} className={visible ? 'visible' : undefined}>
        {filteredLog.map(
          (message, index) => <Message portrait={portraits} key={index} message={message} />,
        )}
      </section>
    )
  ), [filteredLog, portraits, visible]);

  return (
    <div className="Log">
      <div className="heading">
        <button type="button" className="title" onClick={toggleLog}>{title}</button>

        {contents && (
          <button
            className="ExportPDF"
            type="button"
            onClick={runExport}
          >
            {
              exporting
                ? (
                  <span>
                    Exporting
                    {' '}
                    <FontAwesomeIcon icon={faSync} spin />
                  </span>
                )
                : `Export PDF of ${title}`
            }
          </button>
        )}
      </div>

      {contents}
    </div>
  );
};

export default Log;
