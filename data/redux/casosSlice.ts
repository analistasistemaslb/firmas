import { createSlice, Dispatch } from '@reduxjs/toolkit';

import { CasosController } from '@controllers/casos.controller';

const casosController = new CasosController();
export const getCasoRedux = (token: any) => async (dispatch: Dispatch) => {
    try {
        const data = await casosController.getCasoByToken(token);
        await dispatch(setCasos(data));
    } catch (error) {
        console.log('*** getCasoRedux Error: ****', error);
        throw new Error();
    }
};

export const setOtpVerify = async (otp_code: any, token: any) => {
    try {
        const data = await casosController.verifyOTPCode(otp_code, token);
        return data;
    } catch (error) {
        return error;
        //console.log('*** setOtpVerify Error: ****', error);
        //throw new Error();
    }
};
export const setAgainOtp = async (token: any) => {
    try {
        const data = await casosController.againOTPCode(token);
        return data;
    } catch (error: any) {
        return error;
    }
};
export const sendSignature = async (token: any, signatureURL: any) => {
    try {
        const data = await casosController.sendSignature(token, signatureURL);
        return data;
    } catch (error) {
        console.log('*** sendSignature Error: ****', error);
        throw new Error();
    }
};
export const agreeDocuments = async (token: any) => {
    try {
        const data = await casosController.agreeDocuments(token);
        return data;
    } catch (error: any) {
        return error;
    }
};

const casosSlice = createSlice({
    name: 'casos',
    initialState: {
        loader: false,
        case: {
            file: []
        }
    },
    reducers: {
        setCasos: (state, action) => {
            state.case = {...state.case, ...action.payload.case};
        },
        changeLoader: (state) => {
            state.loader = !state.loader;
        }
    },
});

export const { setCasos, changeLoader } = casosSlice.actions;

export default casosSlice.reducer;