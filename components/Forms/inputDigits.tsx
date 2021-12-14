import React, { ReactElement, useState } from 'react'
import InputMask from 'react-input-mask';

interface Props {
    setDigits: Function,
}

export default function InputDigits({setDigits}: Props): ReactElement {
    const [value, setValue] = useState('');
    return (
        <>
            <InputMask 
            className="form-control new-border-color"
            alwaysShowMask={true}
            mask="9-9-9-9" value={value} onChange={(e) => {
                setValue(e.target.value);
                var arrayDigits = e.target.value.split('-');
                setDigits( arrayDigits[0], arrayDigits[1], arrayDigits[2], arrayDigits[3] );
            }} />
        </>
    )
}
