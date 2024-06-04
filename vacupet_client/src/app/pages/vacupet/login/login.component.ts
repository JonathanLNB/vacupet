import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../../../services/vacupet/authentication.service";
import {logOut} from "../../../utils/utils";
import {LocalStorageService} from "../../../services/global/local-storage.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ForgotPasswordComponent} from "../../../components/global/dialogs/forgot-password/forgot-password.component";
import {LoadingComponent} from "../../../components/global/dialogs/loading/loading.component";
import {GenericResponse} from "../../../interfaces/generic-response";
import {UserTypes} from "../../../enums/user-types";
import {User} from "../../../interfaces/person/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public registrationForm: FormGroup;
  public hide: boolean = true;
  public username: string = '';
  public password: string = '';

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private _snackBar: MatSnackBar,
              public _dialog: MatDialog,
              private localStore: LocalStorageService) {
    this.registrationForm = this.fb.group({
      user: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  public onSubmit(): void {
    if (this.registrationForm.valid)
      this.login();
  }

  async login() {
    const reference = this.loadingDialog();
    try {
      const response = await this.authService.SignIn(this.registrationForm.controls["user"].value, this.registrationForm.controls["password"].value)
      response.subscribe(async (user) => {
        const accessToken: string = this.localStore.getData("accessToken") ?? "";
        if (user) {
          if (!accessToken) {
            const response: GenericResponse = (await this.authService.LogIn(user))!.data;
            if (response.Success) {
              const user: User = response.Response;
              if (user.UserType!.Id === UserTypes.ADMIN  && user.IsActive) {
                this.localStore.saveData("accessToken", <string>response.AccessToken);
                this.localStore.saveData("username", `${user.Firstname}  ${user.Middlename} ${user.Lastname}`);
                this.localStore.saveData("usertype", JSON.stringify(user.UserType));
                reference.close();
                this.router.navigate(['auth/owners']);
                return;
              }
            }
            logOut(this.localStore, this.router);
            this.openSnackBar("Usuario o contraseña invalida 😅", false);
          }
        }
        if (accessToken)
          this.openSnackBar("Something went wrong, try it again later", false);
        reference.close();
      });
    } catch (e) {
      console.log("Error", e);
      this.openSnackBar("Usuario o contraseña invalida 😅", false);
      reference.close();
    }
  }

  forgotPasswordDialog(): void {
    this._dialog.open(ForgotPasswordComponent, {
      width: '400px'
    });
  }

  loadingDialog(): MatDialogRef<any> {
    return this._dialog.open(LoadingComponent, {
      width: '250px',
      disableClose: true
    });
  }

  openSnackBar(title: string, success: boolean) {
    this._snackBar.open(title, "Close", {
      duration: 5000,
      panelClass: [success ? 'success-snackbar' : 'error-snackbar']
    });
  }
}
