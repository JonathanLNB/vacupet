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
import {PetService} from "../../../../services/vacupet/pet.service";
import {Pet} from "../../../../interfaces/pet";

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent {
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
    header: "Nombre",
    name: "Name",
    elementKey: "Name",
    type: "text",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: false,
    isVisibleEdit: false,
  }, {
    header: "Fecha de nacimiento",
    name: "DateOfBirth",
    elementKey: "DateOfBirth",
    type: "date",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Tipo de Mascota",
    name: "PetType",
    type: "element",
    elementKey: "Name",
    subtype: "phone",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Raza",
    name: "Race",
    elementKey: "Race",
    type: "text",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Actions",
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
  public data: Pet[] = [];
  public reference!: MatDialogRef<any>;

  constructor(private petService: PetService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private _dialog: MatDialog,
              private localStore: LocalStorageService) {
  }

  async ngAfterViewInit() {
    await this.getPets();
  }

  async getPets() {
    this.reference = this.loadingDialog();
    try {
      const response = (await this.petService.getPets())!.data;
      if (response.Success) {
        this.data = response.Response;
      } else
        this.openSnackBar("Something went wrong, try it again later", false);
    } catch (e: any) {
      console.log("Error", e);
      if (e.response.data.Message === 'Token expired')
        logOut(this.localStore, this.router);
      else
        this.openSnackBar("Something went wrong, try it again later", false);
    }
    this.reference.close();
  }

  async removePet(idPet: string) {
    const reference = this.loadingDialog();
    try {
      const response = (await this.petService.deletePet(idPet))!.data;
      if (response.Success) {
        await this.getPets();
        this.reference.close();
        this.openSnackBar("Pet deleted correctly", true);
      } else
        this.openSnackBar("Something went wrong, try it again later", false);
      reference.close();
    } catch (e: any) {
      console.log("Error", e);
      if (e.response.data.Message === 'Token expired')
        logOut(this.localStore, this.router);
      else
        this.openSnackBar("Something went wrong, try it again later", false);
      reference.close();
    }
  }

  async savePet(pet: Pet, create: boolean) {
    const reference = this.loadingDialog();
    try {
      let response = (await this.petService.addPet(pet))!.data;
      if (response.Success) {
        await this.getPets();
        this.reference.close();
        this.openSnackBar(`Pet ${create ? "created" : "updated"} correctly`, true);
      } else
        this.openSnackBar("Something went wrong, try it again later", false);
      reference.close();
    } catch (e: any) {
      console.log("Error", e);
      if (e.response.data.Message === 'Token expired')
        logOut(this.localStore, this.router);
      else
        this.openSnackBar("Something went wrong, try it again later", false);
      reference.close();
    }
  }

  getPet(pet: Pet) {
    const headers = [...this.tableHeaders];
    headers.pop();
    return this._dialog.open(ShowComponent, {
      width: '650px',
      disableClose: true,
      data: {
        headers: headers,
        title: `${pet.Name}`,
        element: pet,
      }
    });
  }

  createUpdatePet(data: any) {
    const headers = this.createCreateEditHeaders(data.data);
    const reference = this._dialog.open(CreateEditComponent, {
      width: '600px',
      disableClose: true,
      data: {
        headers: headers,
        title: data.create ? `Create Pet` : `Update Pet`,
        element: structuredClone(data.data),
        create: data.create,
        onCreateEdit: async () => {
          /*let pet: Pet = {
            Name: headers[0][1].value,
            Abbreviation: headers[1][1].value,
            Id: undefined,
          }

          if (!data.create) {
            pet.Id = data.data.Id;
          }


          await this.savePet(pet, data.create);*/
          reference.close();
        }
      }
    });
  }

  createCreateEditHeaders(pet: Pet): any[][] {
    return [
      ['Nombre', <RequiredData>{
        type: 'text',
        name: 'Name',
        value: pet ? pet.Name : '',
        requiredCreate: true,
        requiredUpdate: true
      }],
      ['Raza', <RequiredData>{
        type: 'text',
        name: 'Race',
        value: pet ? pet.Race : '',
        requiredCreate: true,
        requiredUpdate: true
      }]];
  }

  deletePet(pet: Pet) {
    const reference = this._dialog.open(DeleteComponent, {
      width: '600px',
      disableClose: true,
      data: {
        element: `pet ${pet.Name}`,
        onDelete: async () => {
          await this.removePet(pet.Id!);
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
