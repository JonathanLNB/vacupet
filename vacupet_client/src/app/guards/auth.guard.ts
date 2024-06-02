import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from "../services/global/local-storage.service";
import {GlobalService} from "../services/vacupet/global-service.service";
import firebase from "firebase/compat";
import {Keys} from "../enums/keys";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router, private localStore: LocalStorageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessToken: string = this.localStore.getDataGuard(Keys.ACCESSTOKEN) ?? "";
    console.log("accessToken", accessToken);
    if (accessToken)
      this.router.navigate(["auth/owners"]);
    return true;
  }
}
