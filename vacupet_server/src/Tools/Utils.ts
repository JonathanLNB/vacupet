import * as CryptoJS from "crypto-js";

function encryptENV(txt: string): string {
    const key: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(process.env.ENV_SECRET_KEY)
    const iv: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(process.env.ENV_SECRET_IV)
    const cipher = CryptoJS.AES.encrypt(txt, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return cipher.toString();
}

function decryptENV(txtToDecrypt: string): string {
    const key: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(process.env.ENV_SECRET_KEY)
    const iv: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(process.env.ENV_SECRET_IV)
    let cipher = CryptoJS.AES.decrypt(txtToDecrypt, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}

function encrypt(txt: string): string {
    const key: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(decryptENV(process.env.SECRET_KEY))
    const iv: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(decryptENV(process.env.SECRET_IV))
    const cipher = CryptoJS.AES.encrypt(txt, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return cipher.toString();
}

function decrypt(txtToDecrypt: string) {
    const key: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(decryptENV(process.env.SECRET_KEY))
    const iv: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(decryptENV(process.env.SECRET_IV))
    let cipher = CryptoJS.AES.decrypt(txtToDecrypt, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}

function formatDate(oldDate: any): string {
    let newDate, year, month, day;
    if (oldDate instanceof Date)
        newDate = new Date(oldDate.getTime());
    else
        newDate = new Date(oldDate.replace(/-/g, '\/').replace(/T.+/, ''));
    day = '' + newDate.getDate();
    month = '' + (newDate.getMonth() + 1);
    year = newDate.getFullYear();
    if (month.length < 2) {
        month = '0' + month
    }
    if (day.length < 2) {
        day = '0' + day
    }
    return [month, day, year].join('/')
}

export {encryptENV, decryptENV, encrypt, decrypt, formatDate}
