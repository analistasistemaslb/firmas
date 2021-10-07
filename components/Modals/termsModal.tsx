import React, { ReactElement } from 'react'
declare const window: any;
interface Props {
    
}

export default function TermsModal({}: Props): ReactElement {
    return (
        <div className="modal" id="termsModal" role="dialog">
            <div className="modal-dialog modal-md" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title modal-aprobador-header text-center">Este documento ya fue Firmado!</h4>
                    </div>
                    <div className="modal-body modal-aprobador-body center-content">
                        <p>Este link ya fue usado y firmado por favor regresa o intenta generar un link nuevo</p>
                    </div>
                    <div className="modal-footer center-content">
                        <button 
                        onClick={()=>{
                            window.location.href = 'https://rqprate.com/'
                        }}
                        className="btn-firma btn-firma-disable" type="button"> Regresar a recuperate </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
