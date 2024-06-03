import {Component} from '@angular/core';
import {DataHeaders} from "../../../../interfaces/data-headers";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LocalStorageService} from "../../../../services/global/local-storage.service";
import {getTableHeaders, logOut} from "../../../../utils/utils";
import {ShowComponent} from "../../../../components/global/dialogs/crud/show/show.component";
import {CreateEditComponent} from "../../../../components/global/dialogs/crud/create-edit/create-edit.component";
import {RequiredData} from "../../../../interfaces/required-data";
import {DeleteComponent} from "../../../../components/global/dialogs/crud/delete/delete.component";
import {LoadingComponent} from "../../../../components/global/dialogs/loading/loading.component";
import {AllergyService} from "../../../../services/vacupet/allergy.service";
import {Allergy} from "../../../../interfaces/allergy";

@Component({
  selector: 'app-allergy',
  templateUrl: './allergy.component.html',
  styleUrls: ['./allergy.component.scss']
})
export class AllergyComponent {
  public tableHeaders: DataHeaders[] = [{
    header: "ID",
    name: "Id",
    elementKey: "Id",
    type: "text",
    isVisibleTable: false,
    isVisibleShow: true,
    isVisibleCreate: false,
    isVisibleEdit: true,
  }, {
    header: "Alergia",
    name: "Name",
    elementKey: "Name",
    type: "text",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Descripción",
    name: "Description",
    elementKey: "Description",
    type: "text",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Acciones",
    name: "",
    elementKey: "",
    type: "actions",
    isVisibleTable: true,
    isVisibleShow: false,
    isVisibleCreate: false,
    isVisibleEdit: false,
    canEdit: true,
    canDelete: true
  }];
  public data: Allergy[] = [];


  constructor(private allergyService: AllergyService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private _dialog: MatDialog,
              private localStore: LocalStorageService) {
  }

  async ngAfterViewInit() {
    await this.getAllergies();
  }

  async getAllergies() {
    const reference = this.loadingDialog();
    try {
      const response = (await this.allergyService.getAllergies())!.data;
      if (response.Success) {
        this.data = response.Response;
      } else
        this.openSnackBar("Something went wrong, try it again later", false);
      reference.close();
    } catch (e: any) {
      console.log("Error", e);
      if (e.response.data.Message === 'Token expired')
        logOut(this.localStore, this.router)
      else
        this.openSnackBar("Something went wrong, try it again later", false);
      reference.close();
    }
  }

  async removeAllergy(idAllergy: string) {
    const reference = this.loadingDialog();
    try {
      const response = (await this.allergyService.deleteAllergy(idAllergy))!.data;
      if (response.Success) {
        this.getAllergies();
        this.openSnackBar("Allergy deleted correctly", true);
      } else
        this.openSnackBar("Something went wrong, try it again later", false);
      reference.close();
    } catch (e: any) {
      console.log("Error", e);
      if (e.response.data.Message === 'Token expired')
        logOut(this.localStore, this.router)
      else
        this.openSnackBar("Something went wrong, try it again later", false);
      reference.close();
    }
  }

  async saveAllergy(allergy: Allergy, create: boolean) {
    const reference = this.loadingDialog();
    try {
      let response = (await this.allergyService.addAllergy(allergy))!.data;
      if (response.Success) {
        this.getAllergies();
        this.openSnackBar(`Allergy ${create ? "created" : "updated"} correclty`, true);
      } else
        this.openSnackBar("Something went wrong, try it again later", false);
      reference.close();
    } catch (e: any) {
      console.log("Error", e);
      if (e.response.data.Message === 'Token expired')
        logOut(this.localStore, this.router)
      else
        this.openSnackBar("Something went wrong, try it again later", false);
      reference.close();
    }
  }

  getAllergy(allergy: Allergy) {
    const headers = [...this.tableHeaders];
    headers.pop();
    return this._dialog.open(ShowComponent, {
      width: '650px',
      disableClose: true,
      data: {
        headers: headers,
        title: `${allergy.Name}`,
        element: allergy,
      }
    });
  }

  createUpdateAllergy(data: any) {
    const headers = this.createCreateEditHeaders(data.data);
    const reference = this._dialog.open(CreateEditComponent, {
      width: '600px',
      disableClose: true,
      data: {
        headers: headers,
        title: data.create ? `Create Allergy` : `Update Allergy`,
        element: structuredClone(data.data),
        create: data.create,
        onCreateEdit: async () => {
          let allergy: Allergy = {
            Name: headers[0][1].value,
            Description: headers[1][1].value,
            Id: undefined,
          }

          if (!data.create)
            allergy.Id = data.data.Id;

          await this.saveAllergy(allergy, data.create);
          reference.close();
        }
      }
    });
  }

  createCreateEditHeaders(allergy: Allergy): any[][] {
    return [
      ['Allergy', <RequiredData>{
        type: 'text',
        name: 'Name',
        value: allergy ? allergy.Name : '',
        minLength: 5,
        maxLength: 25,
        requiredCreate: true,
        requiredUpdate: true
      }],
      ['Description', <RequiredData>{
        type: 'text',
        name: 'Description',
        value: allergy ? allergy.Description : '',
        requiredCreate: true,
        requiredUpdate: true
      }]];
  }

  deleteAllergy(allergy: Allergy) {
    const reference = this._dialog.open(DeleteComponent, {
      width: '600px',
      disableClose: true,
      data: {
        element: `${allergy.Name}`,
        onDelete: async () => {
          await this.removeAllergy(allergy.Id!);
          reference.close()
        }
      }
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

  protected readonly getTableHeaders = getTableHeaders;
}
