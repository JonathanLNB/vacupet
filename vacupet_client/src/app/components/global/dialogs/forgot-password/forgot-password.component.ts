import {Component} from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from "../../../../services/vacupet/authentication.service";
import {MatSnackBar, MatSnackBarDismiss} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {LoadingComponent} from "../loading/loading.component";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ]
})
export class ForgotPasswordComponent {
  public email: string = "";

  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>, private authService: AuthenticationService, private _snackBar: MatSnackBar, public _dialog: MatDialog) {
  }

  async recoverPassword() {
    const reference = this.loadingDialog();
    const response = await this.authService.ForgotPassword(this.email);
    if (response.success)
      this.openSnackBar("Revisa tu correo electrónico 📥", true, true);
    else {
      reference.close();
      console.log("Error", response.error);
      this.openSnackBar("Correo electrónico invalido", false, false);
    }
  }

  loadingDialog(): MatDialogRef<any> {
    return this._dialog.open(LoadingComponent, {
      width: '250px',
      disableClose: true
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openSnackBar(title: string, autoClose: boolean, success: boolean) {
    this._snackBar.open(title, "Close", {
      duration: 5000,
      panelClass: [ success ?'success-snackbar': 'error-snackbar']

    }).afterDismissed().subscribe((value: MatSnackBarDismiss)=>{
      if(autoClose)
        this._dialog.closeAll();
        this.dialogRef.close();
    });
  }
}
