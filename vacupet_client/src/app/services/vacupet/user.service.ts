import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {requestBuilder} from "../../utils/requestbuilder";
import {Peticiones} from "../../utils/peticiones";
import {LocalStorageService} from "../global/local-storage.service";
import {GlobalService} from "./global-service.service";
import {User} from "../../interfaces/person/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public router: Router, public localStorage: LocalStorageService, private globalService: GlobalService) {
  }

  getUsers() {
    return requestBuilder({
      method: Peticiones.GET,
      url: `${this.globalService.vacupetAPI}user/`,
      body: {},
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }

  addUser(user: User) {
    return requestBuilder({
      method: Peticiones.POST,
      url: `${this.globalService.vacupetAPI}user/`,
      body: user,
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }

  updateUser(user: User) {
    return requestBuilder({
      method: Peticiones.PUT,
      url: `${this.globalService.vacupetAPI}user/`,
      body: user,
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }

  deleteUser(idUser: string) {
    return requestBuilder({
      method: Peticiones.DELETE,
      url: `${this.globalService.vacupetAPI}user/${idUser}`,
      body: {},
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }
}
