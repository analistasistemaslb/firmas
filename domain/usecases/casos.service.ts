import { CasosContract } from "@contracts/casos.contract";
import { CasosEntity } from "@entity/casos.entity";

export class CasosService {
    constructor(private casosRepo: CasosContract) {};

    async getCasoByToken(token: any): Promise<CasosEntity> {
        try {
            return await this.casosRepo.getCasoByToken(token);
        } catch (error: any) {
            return error;
        }
    }
    async verifyOTPCode(otp_code: any, token: any): Promise<CasosEntity> {
        try {
            return await this.casosRepo.verifyOTPCode(otp_code, token);
        } catch (error: any) {
            return error;
        }
    }
    async againOTPCode(token: any): Promise<CasosEntity> {
        try {
            return await this.casosRepo.againOTPCode(token);
        } catch (error: any) {
            return error;
        }
    }
    async agreeDocuments(token: any): Promise<CasosEntity> {
        try {
            return await this.casosRepo.agreeDocuments(token);
        } catch (error: any) {
            return error;
        }
    }
    async sendSignature(token: any, signatureURL: any): Promise<CasosEntity> {
        try {
            return await this.casosRepo.sendSignature(token, signatureURL);
        } catch (error: any) {
            return error;
        }
    }
}