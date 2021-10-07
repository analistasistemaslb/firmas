import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux';
interface Props {
    
}

export default function LoaderModal({}: Props): ReactElement {
    const loader = useSelector((state: any) => state.casos.loader);
    if(loader){
        return (
            <>
                <div className="cargador-screen">
                    <div className="cargador-screen-icon"></div>
                </div>
                <div className="modal-backdrop fade show"></div>
            </>
        )
    }
    return (<></>);
}
