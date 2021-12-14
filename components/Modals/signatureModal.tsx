import React, { ReactElement, useRef, useState } from 'react'
import SignaturePad from 'react-signature-pad-wrapper'
import { changeLoader, sendSignature } from '@redux/casosSlice';
import { useDispatch } from 'react-redux';
interface Props {
    token: string
}
declare const window: any;
export default function SignatureModal({ token }: Props): ReactElement {
    const dispatch = useDispatch();
    const [signature, setSignature] = useState(null);
    const [messages, setMessages] = useState({
        type: '',
        show: false,
        message: ''
    })
    const padSignature = useRef() as React.MutableRefObject<any>;
    const cleanCanvasAction = () => {
        padSignature.current.clear();
    }
    const sendSignatureAction = async () => {
        dispatch(changeLoader());
        const canvas: HTMLCanvasElement = window.$('#firmaCanvas')[0];
        const tmpCanvas: HTMLCanvasElement = document.createElement('canvas');
        tmpCanvas.width = 198;
        tmpCanvas.height = 112;
        const ctx: any = tmpCanvas.getContext('2d');
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 198, 112);
        const resultSignature: any = tmpCanvas.toDataURL("image/png");
        //Validate blank canvas
        const blankCanvas: HTMLCanvasElement = document.createElement('canvas');
        blankCanvas.width = 198;
        blankCanvas.height = 112;
        const ctxBlank: any = blankCanvas.getContext('2d');
        ctxBlank.fillStyle = "white";
        ctxBlank.fillRect(0, 0, blankCanvas.width, blankCanvas.height);
        if(tmpCanvas.toDataURL("image/png") == blankCanvas.toDataURL("image/png")){
            setMessages({
                ...messages,
                type: 'danger',
                show: true,
                message: 'Oops, Debes dibujar tu firma!'
            })
            dispatch(changeLoader());
            return false;
        }
        const response: any = await sendSignature(token, resultSignature);
        setMessages({
            ...messages,
            type: response.status ? 'success' : 'danger',
            show: true,
            message: response.message
        })
        dispatch(changeLoader());
        if(response.status){
            window.location.href = response.link;
        }
        //console.log(">>>>>>", response);
    }
    return (
        <div className="modal" id="signatureModal" role="dialog">
            <div className="modal-dialog modal-md" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title modal-aprobador-header text-center">Dibuja tu firma</h4>
                    </div>
                    <div className="modal-body modal-signature-body center-content">
                        <p>Puedes repetir cuantas veces necesites la firma, necesitamos que sea clara, lo mas parecido a la firma de tu documento de identificación</p>
                        {   messages.show &&
                            <div className={`alert alert-${messages.type}`} role="alert">
                                {messages.message}
                            </div>
                        }
                        <SignaturePad 
                        canvasProps={{
                            id: 'firmaCanvas'
                        }}
                        ref={padSignature}
                        options={{
                            backgroundColor: 'rgb(255, 255, 255)',
                            penColor: 'rgb(0, 0, 0)'
                        }} />
                    </div>
                    {signature && 
                        <div>
                            <img src={signature}/>
                        </div> 
                    }
                    <div className="modal-footer center-content">
                        <button
                            onClick={sendSignatureAction}
                            className="btn-firma btn-lg btn-firma-disable" type="button"> Enviar Firma <svg
                            xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-telegram"
                            width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"/>
                        </svg></button>
                        <button 
                        onClick={cleanCanvasAction}
                        className="btn-limpiar btn-firma-disable" type="button"> Limpiar </button>

                    </div>
                </div>
            </div>
        </div>
    )
}
