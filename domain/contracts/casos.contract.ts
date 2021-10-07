import { CasosEntity } from "@entity/casos.entity";

export abstract class CasosContract {
    abstract getCasoByToken(token: any): Promise<CasosEntity>;
    abstract verifyOTPCode(otp_code: any, token: any): Promise<CasosEntity>;
    abstract againOTPCode(token: any): Promise<CasosEntity>;
    abstract sendSignature(token: any, signatureURL: any): Promise<CasosEntity>;
    abstract agreeDocuments(token: any): Promise<CasosEntity>;
}