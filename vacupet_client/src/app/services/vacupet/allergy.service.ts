import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {requestBuilder} from "../../utils/requestbuilder";
import {Peticiones} from "../../utils/peticiones";
import {LocalStorageService} from "../global/local-storage.service";
import {GlobalService} from "./global-service.service";
import {Allergy} from "../../interfaces/allergy";

@Injectable({
  providedIn: 'root'
})
export class AllergyService {

  constructor(public router: Router, public localStorage: LocalStorageService, private globalService: GlobalService) {
  }

  getAllergies() {
    return requestBuilder({
      method: Peticiones.GET,
      url: `${this.globalService.vacupetAPI}allergy/`,
      body: {},
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }

  addAllergy(allergy: Allergy) {
    return requestBuilder({
      method: Peticiones.POST,
      url: `${this.globalService.vacupetAPI}allergy/`,
      body: allergy,
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }

  updateAllergy(allergy: Allergy) {
    return requestBuilder({
      method: Peticiones.PUT,
      url: `${this.globalService.vacupetAPI}allergy/`,
      body: allergy,
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }

  deleteAllergy(idAllergy: string) {
    return requestBuilder({
      method: Peticiones.DELETE,
      url: `${this.globalService.vacupetAPI}allergy/${idAllergy}`,
      body: {},
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }
}
