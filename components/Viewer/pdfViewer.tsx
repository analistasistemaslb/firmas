import MainFooter from '@components/Footer/mainFooter';
import React, { ReactElement, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf';
import { useSelector } from 'react-redux';
import IframeViewer from "@components/Viewer/iframeViewer";
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf/pdf.worker.min.js';

interface Props {
    token: string
}

export default function PdfViewer({ token }: Props): ReactElement {
    const caso = useSelector((state: any) => state.casos.case);
    const [numPages, setNumPages] = useState(1);
    const [isZoom, setIsZoom] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = (pdf: any) => {
        setNumPages(pdf.numPages);
    }
    const nextButtonAction = () => {
        if(pageNumber < numPages){
            setPageNumber(pageNumber + 1 );
        }
    }
    const prevButtonAction = () => {
        if(pageNumber > 1){
            setPageNumber(pageNumber - 1 );
        }
    }
    const zoomInAction = () => {
        if(isZoom >= 0 && isZoom < 4){
            setIsZoom(isZoom + 1);
        }   
    }
    const zoomOutAction = () => {
        if(isZoom >= 1 && isZoom <= 4){
            setIsZoom(isZoom - 1);
        }
    }
    console.log(">>>",caso.file.length);
    return (
        <>
            { caso.file.length > 0 ?
                <>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        {caso.file.map((file : any, index: any) =>{
                            return (
                                <li className={`nav-item ${!index ? 'active': ''}`} role="presentation">
                                    <a className="nav-link" id={`tab-${index}`} data-toggle="tab"
                                       href={`#tabref-${index}`} role="tab"
                                           aria-controls={`#tabref-${index}`} aria-selected="true">{file.name}</a>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="tab-content" id="tabsFiles">
                        {caso.file.map((file : any, index: any) => {
                            return <IframeViewer index={index} key={`file-${file.name}`} file={file}/>
                        })}
                        {/*<Document
                    className={isZoom > 0 ? 'zoom': ''}
                    file={`data:application/pdf;base64,${caso.file[0]}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page
                    className={`zoom_${isZoom}`}
                    pageNumber={pageNumber} />
                </Document>*/}
                    </div>
                </>

                : <div className={"jumbotron"}><h4>No hay Archivos que cargar</h4></div>}
            <MainFooter
                pages={numPages}
                pageNumber={pageNumber}
                nextButton={nextButtonAction}
                prevButton={prevButtonAction}
                zoomIn={zoomInAction}
                zoomOut={zoomOutAction}
                token={token}
            />
        </>
    )
}
