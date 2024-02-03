import PropTypes from "prop-types";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

//style
import arrowLeft from "../../assets/images/icons/arrow-left-circle.svg";
import arrowRight from "../../assets/images/icons/arrow-right-circle.svg";
import xCircle from "../../assets/images/icons/x-circle.svg";
import "./docviewer.css";
function DocViewer({ file, onCloseViewer }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const goToPreviousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  };

  return (
    <div className="">
      <button className="viewer-button" onClick={onCloseViewer}>
        <img src={xCircle} className="" />
      </button>
      <Document className="pdf-container" file={file} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="flex flex-row justify-between items-center">
        <p className="border border-[#163767] rounded-lg p-1">
          Page {pageNumber} of {numPages}
        </p>
        <div className="flex flex-row space-x-2">
          <button onClick={goToPreviousPage} disabled={pageNumber <= 1} className="viewer-button">
            <img src={arrowLeft} className={`${pageNumber === 1 && "pointer-event-none opacity-30"}`} />
          </button>
          <button onClick={goToNextPage} disabled={pageNumber >= numPages} className="viewer-button">
            <img src={arrowRight} className={`${pageNumber === numPages && "pointer-event-none opacity-30"}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

DocViewer.propTypes = {
  file: PropTypes.string.isRequired,
  onCloseViewer: PropTypes.func.isRequired,
};

export default DocViewer;
