import PropTypes from "prop-types";
import { Document, Page } from "react-pdf";

function DocViewer({ file }) {
  return (
    <div className="">
      <Document file={file}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}

DocViewer.propTypes = {
  file: PropTypes.string.isRequired,
};

export default DocViewer;
