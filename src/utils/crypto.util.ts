import * as CryptoJS from 'crypto-js';

export default class CryptoUtil {

    static encrypt(key: string, dto: any): string {
        const dtoJson = JSON.stringify(dto);
        return CryptoJS.AES.encrypt(dtoJson, key).toString();
    }

    static decrypt(key: string, textToDecrypt: string): any {
        const bytes = CryptoJS.AES.decrypt(textToDecrypt, key);
        const result = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(result);
    }
}