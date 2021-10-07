import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux';
interface Props {
    
}

export default function MainHeader({}: Props): ReactElement {
    const caso = useSelector((state: any) => state.casos.case);
    return (
        <div className="desk-nav-bar">
            <div className="sub-nav">
                <div className="img_nav">
                    <img src="/images/logo_full.png" />
                </div>
                <div>
                    <p className="number_list fz-16 text-right"> {caso.name} </p>
                    <p className="dtl-tl text-right">N° de Aprobacion {caso.approved_number}</p>
                </div>
            </div>
        </div>
    )
}
