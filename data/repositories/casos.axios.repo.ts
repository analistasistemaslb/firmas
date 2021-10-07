import { CasosContract } from "@contracts/casos.contract";
import { CasosEntity } from "@entity/casos.entity";

import axios from "axios";
import helpers from "@utils/helpers";
export class CasosAxiosRepo implements CasosContract {
    
    async getCasoByToken(token: any): Promise<CasosEntity> {
        try {
            const request = await axios.get(helpers.apiUrl + helpers.getCasoByToken+'?token='+token);
            return request.data;
        } catch (error: any) {
            return error.response.data;
        }
    }
    async verifyOTPCode(otp_code: any, token: any): Promise<CasosEntity> {
        try {
            var data = new FormData();
            data.append('FormOtp[token]', token);
            data.append('FormOtp[code_1]', otp_code.code_1);
            data.append('FormOtp[code_2]', otp_code.code_2);
            data.append('FormOtp[code_3]', otp_code.code_3);
            data.append('FormOtp[code_4]', otp_code.code_4);
            const request = await axios.post(helpers.apiUrl + helpers.verifyOTPCode, data);
            return request.data;
        } catch (error: any) {
            return error.response.data;
        }
    }
    async againOTPCode(token: any): Promise<CasosEntity> {
        try {
            var form = new FormData();
            form.append("token", token);
            const request = await axios.post(helpers.apiUrl + helpers.againOTPCode, form);
            return request.data;
        } catch (error: any) {
            return error.response.data;
        }
    }
    async agreeDocuments(token: any): Promise<CasosEntity> {
        try {
            var form = new FormData();
            form.append("token", token);
            const request = await axios.post(helpers.apiUrl + helpers.agreeDocuments, form);
            return request.data;
        } catch (error: any) {
            return error.response.data;
        }
    }
    async sendSignature(token: any, signatureURL: any): Promise<CasosEntity> {
        try {
            var data = new FormData();
            data.append('token', token);
            data.append('signature', signatureURL);
            const request = await axios.post(helpers.apiUrl + helpers.sendSignature, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return request.data;
        } catch (error: any) {
            return error.response.data;
        }
    }

}