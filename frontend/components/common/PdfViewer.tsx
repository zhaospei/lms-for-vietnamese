'use client';

import { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import '@/styles/css/react-pdf.css'

import type { PDFDocumentProxy } from 'pdfjs-dist';
import { Typography } from 'antd';

const { Text } = Typography

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

// const maxWidth = 800;

type PDFFile = string | File | null;

export default function PdfViewer({
    width = '80vw',
    height,
    file,
    viewType = 'full'
}: {
    width?: number | string,
    height?: number
    file: PDFFile,
    viewType?: 'preview' | 'full'
}) {
    const [numPages, setNumPages] = useState<number>();
    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>();

    const onResize = useCallback<ResizeObserverCallback>((entries) => {
        const [entry] = entries;

        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);

    useResizeObserver(containerRef, resizeObserverOptions, onResize);

    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(nextNumPages);
    }

    // return (
    //   <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
    //     {Array.from(new Array(numPages), (el, index) => (
    //       <Page
    //         key={`page_${index + 1}`}
    //         pageNumber={index + 1}
    //         width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
    //       />
    //     ))}
    //   </Document>
    // )
    return (
        <div className="Example__container__document" ref={setContainerRef} style={{ background: 'white', width: width }}>
            <Document
                file={`${process.env.URL}/${file}`}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
                error={<Text>{`Fail to load ${file}`}</Text>}
                onLoadError={(e) => console.log(e)}
            >
                {Array.from(new Array(viewType === 'full' ? numPages : 1), (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        // width={'80vw'}
                        width={containerWidth}
                        height={height}
                    />
                ))}
            </Document>
        </div>
    );
}
