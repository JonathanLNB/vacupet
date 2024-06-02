import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from "../services/global/local-storage.service";
import {UserType} from "../interfaces/user-type";
import {UserTypes} from "../enums/user-types";
import {Keys} from "../enums/keys";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(public router: Router, private localStore: LocalStorageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessToken: string = this.localStore.getDataGuard(Keys.ACCESSTOKEN) ?? "";
    if (!accessToken) {
      this.router.navigate([""]);
      return true;
    }
    return true
  }

  isValidForAdmin(route: string): boolean {
    const usertype: UserType = JSON.parse(this.localStore.getData("usertype") ?? "{}");
    switch (route) {
      case 'owners':
      case 'users':
      case 'allergies':
      case 'pets':
      case 'settings':
        return usertype.Id === UserTypes.ADMIN;
      default:
        return false;
    }
  }
}
