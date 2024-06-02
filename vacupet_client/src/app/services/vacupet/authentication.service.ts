import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {requestBuilder} from "../../utils/requestbuilder";
import {Peticiones} from "../../utils/peticiones";
import {environment} from 'src/environments/environment';
import {GlobalService} from "./global-service.service";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private globalService: GlobalService
  ) {
  }

  async SignIn(email: string, password: string) {
    const user: any = await this.afAuth.signInWithEmailAndPassword(email, password);
    return this.afAuth.authState
  }

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        return {success: true, error: ""};
      })
      .catch((error) => {
        return {success: false, error: error};
      });
  }

  LogIn(user: any) {
    return requestBuilder({
      method: Peticiones.POST, url: `${this.globalService.vacupetAPI}session/logIn`, body: {
        uidFirebase: user.uid,
      }, headers: {auth: this.globalService.auth}
    });
  }
}
