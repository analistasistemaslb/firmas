import React, { ReactElement, useRef, useState } from 'react'
import { setOtpVerify, setAgainOtp, changeLoader } from '@redux/casosSlice';
import { useDispatch } from 'react-redux';
import InputDigits from '@components/Forms/inputDigits';

interface Props {
    token: string
}
declare const window: any;
export default function OtpModal({ token }: Props): ReactElement {
    const dispatch = useDispatch()
    const formRef = useRef<HTMLFormElement>(null);
    const otpOne = useRef<HTMLInputElement>(null);
    const otpTwo = useRef<HTMLInputElement>(null);
    const otpThree = useRef<HTMLInputElement>(null);
    const otpFour = useRef<HTMLInputElement>(null);
    const [messages, setMessages] = useState({
        type: '',
        show: false,
        message: ''
    })
    const [numbers, setNumbers] = useState({
        code_1: null,
        code_2: null,
        code_3: null,
        code_4: null
    })
    const otpOneAction = (e: any) => {
        return !/[0-9]/.test(e.key) ? false : otpTwo.current?.focus();
    }
    const otpTwoAction = (e: any) => {
        return !/[0-9]/.test(e.key) ? false : otpThree.current?.focus();
    }
    const otpThreeAction = (e: any) => {
        return !/[0-9]/.test(e.key) ? false : otpFour.current?.focus();
    }
    const otpFourAction = (e: any) => {
        /** */
    }
    const validateNumber = (e: any, input: any) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
            return;
        }else{
            setNumbers({...numbers, [input]: e.key })
        }
    }
    const validateNumberChange = (e: any, input: any) => {
        if (!/[0-9]/.test(e.target.value)) {
            e.preventDefault();
            return;
        }else{
            setNumbers({...numbers, [input]: e.target.value })
        }
    }
    const verifyOtp = async () => {
        /**if(numbers.code_1 == null && numbers.code_2 == null && numbers.code_3 == null && numbers.code_4 == null){
            setMessages({
                ...messages,
                type: 'danger',
                show: true,
                message: 'Debes llenar el codigo OTP'
            })
            return false;
        }**/
        //console.log(">>>>>", numbers);
        dispatch(changeLoader());
        const response: any = await setOtpVerify(numbers, token);
        dispatch(changeLoader());
        setMessages({
            ...messages,
            type: response.status ? 'success' : 'danger',
            show: true,
            message: response.message
        })
        if(response.status){
            window.$('#otpModal').modal('toggle');
        }
    }
    const sendAgainOtp = async () => {
        dispatch(changeLoader());
        const response = await setAgainOtp(token)
        formRef.current?.reset();
        setMessages({
            ...messages,
            type: response.status ? 'success' : 'danger',
            show: true,
            message: response.message
        })
        dispatch(changeLoader());
        //console.log(">>>>>again", response)
    }
    return (
        <div className="modal" id="otpModal" role="dialog">
            <div className="modal-dialog modal-md" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title modal-aprobador-header text-center">Ingresar el código de seguridad</h4>
                    </div>
                    <div className="modal-body modal-aprobador-body center-content">
                        <p>Este código fue enviado a tu correo electrónico y a tu número móvil, ingresalo para firmar y aceptar los documentos.</p>
                        {   messages.show &&
                            <div className={`alert alert-${messages.type}`} role="alert">
                                {messages.message}
                            </div>
                        }
                        <form ref={formRef}>
                            <div className="container-otp">
                                <InputDigits 
                                    setDigits={(input1: any, input2: any, input3: any, input4: any) => {
                                        setNumbers({...numbers, 
                                            code_1: input1,
                                            code_2: input2,
                                            code_3: input3,
                                            code_4: input4
                                        })
                                    }}
                                />
                                {/**<input id="OTP1"
                                autoFocus={true} 
                                autoComplete='off'
                                ref={otpOne}
                                pattern="[0-9]*" 
                                inputMode={"numeric"}
                                onKeyPress={(e) => validateNumber(e, 'code_1')}
                                onChange={(e) => validateNumberChange(e, 'code_1')}
                                onKeyUp={otpOneAction}
                                type="text" maxLength={1} />
                                <input id="OTP2" 
                                ref={otpTwo}
                                autoComplete='off'
                                pattern="[0-9]*" 
                                inputMode={"numeric"}
                                onKeyPress={(e) => validateNumber(e, 'code_2')}
                                onChange={(e) => validateNumberChange(e, 'code_2')}
                                onKeyUp={otpTwoAction}
                                type="text" maxLength={1} />
                                <input id="OTP3" 
                                ref={otpThree}
                                autoComplete='off'
                                pattern="[0-9]*" 
                                inputMode={"numeric"}
                                onKeyPress={(e) => validateNumber(e, 'code_3')}
                                onChange={(e) => validateNumberChange(e, 'code_3')}
                                onKeyUp={otpThreeAction}
                                type="text" maxLength={1} />
                                <input id="OTP4" 
                                ref={otpFour}
                                autoComplete='off'
                                pattern="[0-9]*" 
                                inputMode={"numeric"}
                                onKeyPress={(e) => validateNumber(e, 'code_4')}
                                onChange={(e) => validateNumberChange(e, 'code_4')}
                                onKeyUp={otpFourAction}
                                type="text" maxLength={1} />**/}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer center-content">
                        <button 
                        onClick={verifyOtp}
                        className="btn-limpiar btn-firma-disable" type="button"> Continuar </button>
                        <button 
                        onClick={sendAgainOtp}
                        className="btn-firma btn-firma-disable" type="button"> Generar nuevo OTP </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
