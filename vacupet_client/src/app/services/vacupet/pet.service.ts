import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {requestBuilder} from "../../utils/requestbuilder";
import {Peticiones} from "../../utils/peticiones";
import {LocalStorageService} from "../global/local-storage.service";
import {GlobalService} from "./global-service.service";
import {Pet} from "../../interfaces/pet";
import {Vaccinated} from "../../interfaces/vaccinated";

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(public router: Router, public localStorage: LocalStorageService, private globalService: GlobalService) {
  }

  getPets() {
    return requestBuilder({
      method: Peticiones.GET,
      url: `${this.globalService.vacupetAPI}pet/`,
      body: {},
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }

  addPet(pet: Pet) {
    return requestBuilder({
      method: Peticiones.POST,
      url: `${this.globalService.vacupetAPI}pet/`,
      body: pet,
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }

  addVaccinated(vaccinated: Vaccinated) {
    return requestBuilder({
      method: Peticiones.POST,
      url: `${this.globalService.vacupetAPI}pet/vaccinated`,
      body: vaccinated,
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }

  updatePet(pet: Pet) {
    return requestBuilder({
      method: Peticiones.PUT,
      url: `${this.globalService.vacupetAPI}pet/`,
      body: pet,
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }

  deletePet(idPet: string) {
    return requestBuilder({
      method: Peticiones.DELETE,
      url: `${this.globalService.vacupetAPI}pet/${idPet}`,
      body: {},
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }
}
