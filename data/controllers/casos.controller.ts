import { CasosEntity } from "@entity/casos.entity";
import { CasosService } from "@usecases/casos.service";
import { CasosCacheRepo } from "@repositories/casos.cache.repo";
import { CasosAxiosRepo } from "@repositories/casos.axios.repo";

const casosRepo = new CasosAxiosRepo();
const casosService = new CasosService(casosRepo);

export class CasosController {
    
    async getCasoByToken(token: any): Promise<CasosEntity> {
        try {
            return await casosService.getCasoByToken(token);
        } catch (error: any) {
            return error;
        }
    }
    async verifyOTPCode(otp_code: any, token: any): Promise<CasosEntity> {
        try {
            return await casosService.verifyOTPCode(otp_code, token);
        } catch (error: any) {
            return error;
        }
    }
    async againOTPCode(token: any): Promise<CasosEntity> {
        try {
            return await casosService.againOTPCode(token);
        } catch (error: any) {
            return error;
        }
    }
    async agreeDocuments(token: any): Promise<CasosEntity> {
        try {
            return await casosService.agreeDocuments(token);
        } catch (error: any) {
            return error;
        }
    }
    async sendSignature(token: any, signatureURL: any): Promise<CasosEntity> {
        try {
            return await casosService.sendSignature(token, signatureURL);
        } catch (error: any) {
            return error;
        }
    }
}