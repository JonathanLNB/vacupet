import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {LocalStorageService} from "../global/local-storage.service";
import {requestBuilder} from "../../utils/requestbuilder";
import {Peticiones} from "../../utils/peticiones";
import {GlobalService} from "./global-service.service";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(public router: Router, public localStorage: LocalStorageService, private globalService: GlobalService) {
  }

  getCollection(collection: string) {
    return requestBuilder({
      method: Peticiones.GET,
      url: `${this.globalService.vacupetAPI}collection/${collection}`,
      body: {},
      headers: {headers: {Authorization: `Bearer ${this.localStorage.getData("accessToken")}`}}
    });
  }
}
