import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    generateThumbnails(numPages);
  }

  function generateThumbnails(numPages: number) {
    const thumbnailPromises = [];
    for (let i = 1; i <= numPages; i++) {
      thumbnailPromises.push(
        pdfjs.getDocument(file).promise.then((pdf) => {
          return pdf.getPage(i).then((page) => {
            const viewport = page.getViewport({ scale: 0.1 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const context = canvas.getContext('2d');
            page.render({ canvasContext: context, viewport }).promise.then(() => {
              return canvas.toDataURL();
            });
          });
        })
      );
    }
    Promise.all(thumbnailPromises).then((thumbnails) => {
      setThumbnails(thumbnails);
    });
  }

  function handleSearch() {
    if (!searchText) return;
    const searchPromises = [];
    for (let i = 1; i <= (numPages || 0); i++) {
      searchPromises.push(
        pdfjs.getDocument(file).promise.then((pdf) => {
          return pdf.getPage(i).then((page) => {
            return page.getTextContent().then((textContent) => {
              const text = textContent.items.map((item: any) => item.str).join(' ');
              if (text.includes(searchText)) {
                return i;
              }
              return null;
            });
          });
        })
      );
    }
    Promise.all(searchPromises).then((results) => {
      setSearchResults(results.filter((result) => result !== null) as number[]);
    });
  }

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div>
          <button onClick={() => setScale(scale + 0.1)}>Zoom In</button>
          <button onClick={() => setScale(scale - 0.1)}>Zoom Out</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="flex mb-4">
        {thumbnails.map((thumbnail, index) => (
          <img
            key={index}
            src={thumbnail}
            alt={`Page ${index + 1}`}
            className="w-16 h-20 cursor-pointer"
            onClick={() => setPageNumber(index + 1)}
          />
        ))}
      </div>
      <Document
        file={`http://localhost:5000/${file}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} scale={scale} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button
        disabled={pageNumber <= 1}
        onClick={() => setPageNumber(pageNumber - 1)}
      >
        Previous
      </button>
      <button
        disabled={pageNumber >= (numPages || 0)}
        onClick={() => setPageNumber(pageNumber + 1)}
      >
        Next
      </button>
      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} onClick={() => setPageNumber(result)}>
                Page {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;