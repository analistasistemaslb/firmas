import React, { ReactElement } from 'react'

import iconSet from "@utils/selection.json";
import IcomoonReact, { iconList } from "icomoon-react";
import { agreeDocuments, changeLoader } from '@redux/casosSlice';
import { useDispatch } from 'react-redux';

declare const window: any;

interface Props {
    pages: number
    pageNumber: number
    nextButton: any
    prevButton: any
    zoomIn: any
    zoomOut: any
    token: any
}

export default function MainFooter({pages, pageNumber, nextButton, prevButton, zoomIn, zoomOut, token}: Props): ReactElement {
    const dispatch = useDispatch();
    const openModalSignature = async () => {
        dispatch(changeLoader());
        const response = await agreeDocuments(token);
        dispatch(changeLoader());
        window.$('#signatureModal').modal({backdrop: 'static', keyboard: false});
    }
    return (
        <div className="nav-pdf">
            <div className="container">
                <div className="row">
                    {/*<div className="col-12 col-md-4 text-center text-sm-center text-md-left">
                        <span>Documento {pageNumber} de {pages}</span>
                    </div>*/}
                    <div className="col-12 col-md-12 cole-lg-12 text-center">
                        <button 
                        onClick={openModalSignature}
                        className="btn-firma">Acepta Documentos</button>
                    </div>
                    {/*<div className="col-12 col-md-4">
                        <div className="options-pdf">
                            <div 
                            className="tls-item">
                                <a 
                                onClick={prevButton}
                                className="btn_ico_pdf">
                                    <IcomoonReact 
                                    iconSet={iconSet} 
                                    color="#fff" 
                                    size={19} 
                                    icon="previous2" />
                                </a>
                            </div>
                            <div 
                            className="tls-item">
                                <a 
                                onClick={nextButton}
                                className="btn_ico_pdf">
                                    <IcomoonReact 
                                    iconSet={iconSet} 
                                    color="#fff" 
                                    size={19} 
                                    icon="next2" />
                                </a>
                            </div>
                            <div 
                            className="tls-item">
                                <a 
                                onClick={zoomIn}
                                className="btn_ico_pdf">
                                    <IcomoonReact 
                                    iconSet={iconSet} 
                                    color="#fff" 
                                    size={19} 
                                    icon="zoom-in" />
                                </a>
                            </div>
                            <div 
                            className="tls-item">
                                <a 
                                onClick={zoomOut}
                                className="btn_ico_pdf">
                                    <IcomoonReact 
                                    iconSet={iconSet} 
                                    color="#fff" 
                                    size={19} 
                                    icon="zoom-out" />
                                </a>
                            </div>
                        </div>
                    </div>*/}
                </div>
            </div>
            {/**<div className="content-nav-pdf">
                
                
                <button 
                data-toggle="modal" 
                data-target="#otpModal"
                className="btn-firma"
                >Modal OTP </button>
                <button className="btn-firma"
                data-toggle="modal" 
                data-target="#signatureModal"
                >Modal Firma </button>
                
            </div>**/}
        </div>
    )
}
