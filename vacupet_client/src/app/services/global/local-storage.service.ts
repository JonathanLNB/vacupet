import {Injectable} from '@angular/core';
import {GlobalService} from "../vacupet/global-service.service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(private globalService: GlobalService) {
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(this.globalService.encrypt(key), this.globalService.encrypt(value));
  }

  public getData(key: string) {
    let data = localStorage.getItem(this.globalService.encrypt(key)) || "";
    return this.globalService.decrypt(data);
  }

  public getDataGuard(key: string) {
    let data = localStorage.getItem(key) || "";
    return data;
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
