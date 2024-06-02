import {Injectable} from '@angular/core';
import * as CryptoJS from "crypto-js";
import {environment} from "../../../environments/environment";
import {AngularFireRemoteConfig} from "@angular/fire/compat/remote-config";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private ENV_SECRET_KEY: string | undefined;
  private ENV_SECRET_IV: string | undefined;
  private _vacupetAPI: string | undefined;
  private _vacupetAPIStorage: string | undefined;
  private _storageKey: string | undefined;
  private _storageIV: string | undefined;
  private _auth: any;

  constructor(private remoteConfig: AngularFireRemoteConfig) {
    this.remoteConfig.fetchAndActivate().then(async () => {
      this.ENV_SECRET_KEY = await this.remoteConfig.getString('SECRET_KEY');
      this.ENV_SECRET_IV = await this.remoteConfig.getString('SECRET_IV');
      this._vacupetAPI = this.decryptENV(environment.vacupetAPI)
      this._vacupetAPIStorage = this.decryptENV(environment.vacupetAPIStorage)
      this._storageKey = this.decryptENV(environment.storageKey)
      this._storageIV = this.decryptENV(environment.storageIV)
      this._auth = JSON.parse(this.decryptENV(environment.auth))
    });
  }

  decryptENV(txtToDecrypt: string): string {
    const key: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(this.ENV_SECRET_KEY!)

    const iv: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(this.ENV_SECRET_IV!)
    let cipher = CryptoJS.AES.decrypt(txtToDecrypt, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return cipher.toString(CryptoJS.enc.Utf8);
  }

  encrypt(txt: string): string {
    const key: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(this._storageKey!)
    const iv: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(this._storageIV!)
    const cipher = CryptoJS.AES.encrypt(txt, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return cipher.toString();
  }

  decrypt(txtToDecrypt: string) {
    const key: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(this._storageKey!)
    const iv: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(this._storageIV!)
    let cipher = CryptoJS.AES.decrypt(txtToDecrypt, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return cipher.toString(CryptoJS.enc.Utf8);
  }

  get vacupetAPI(): string | undefined {
    return this._vacupetAPI;
  }

  get vacupetAPIStorage(): string | undefined {
    return this._vacupetAPIStorage;
  }


  get storageKey(): string | undefined {
    return this._storageKey;
  }

  get storageIV(): string | undefined {
    return this._storageIV;
  }


  get auth(): any {
    return this._auth;
  }

}
