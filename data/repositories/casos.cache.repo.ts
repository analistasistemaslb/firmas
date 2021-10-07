import { CasosContract } from "@contracts/casos.contract";
import { CasosEntity } from "@entity/casos.entity";

export class CasosCacheRepo implements CasosContract {
    agreeDocuments(token: any): Promise<CasosEntity> {
        throw new Error("Method not implemented.");
    }
    async getCasoByToken(token: any): Promise<CasosEntity> {

        return {
            case: {
                name: "wilson mora",
                file: "https://rqprate-assets.s3.us-east-2.amazonaws.com/6144b4f665494.pdf",
                document: "1073131367",
                approved_number: 109
            }
        };
    }
    async verifyOTPCode(otp_code: any, token: any): Promise<CasosEntity> {
        return {
            status: true
        }
    }
    async againOTPCode(token: any): Promise<CasosEntity> {
        return {
            status: true
        }
    }
    async sendSignature(token: any): Promise<CasosEntity> {
        return {
            status: true
        }
    }
}
