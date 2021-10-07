import { GetServerSideProps } from 'next'
import MainHeader from '@components/Header/mainHeader';
import PdfViewer from '@components/Viewer/pdfViewer';
import OtpModal from '@components/Modals/otpModal';
import SignatureModal from '@components/Modals/signatureModal';
import Head from 'next/head';
import React, { ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getCasoRedux } from '@redux/casosSlice';
import LoaderModal from '@components/Modals/loaderModal';
import axios from 'axios';
import helpers from "@utils/helpers";
import TermsModal from '@components/Modals/termsModal';

declare const window: any;

interface Props { 
    token: string,
    finish: string
}

export default function Signature({ token, finish }: Props): ReactElement {
    const dispatch = useDispatch()
    useEffect(() => {
        if(process.browser){
            if(finish){
                window.$('#termsModal').modal({backdrop: 'static', keyboard: false});
            }else{
                window.$('#otpModal').modal({backdrop: 'static', keyboard: false});
            }
            //window.$('#signatureModal').modal({backdrop: 'static', keyboard: false});
        }
        dispatch( getCasoRedux(token) );
    }, []);
    return (
        <>
            <Head>
                <title>Firma Documentos - Rqprate</title>
                <meta name="description" content="Firma Documentos - Rqprate" />
            </Head>
            <LoaderModal />
            <div className="dash">
                <MainHeader />
                <div className="dh-content">
                    <div className="box">
                        <hr />
                        {!finish &&
                            <PdfViewer token={token} />
                        }
                    </div>
                </div>
            </div>
            <OtpModal token={token}/>
            <SignatureModal token={token} />
            <TermsModal />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context?.query.token;
    if(!token){
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }
    try{
        const res = await axios.get(helpers.apiUrl + helpers.getCasoByToken, {
            params: {
                token: token
            }
        });
        const finish = await res.data.case.finished_process;
        return {
            props: {
                token,
                finish
            }
        }
    }catch (e) {
        return {
            redirect: {
                destination: '/500',
                permanent: false
            }
        }
    }
}
