import {Component} from '@angular/core';
import {DataHeaders} from "../../../../interfaces/data-headers";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LocalStorageService} from "../../../../services/global/local-storage.service";
import {getTableHeaders, logOut} from "../../../../utils/utils";
import {ShowComponent} from "../../../../components/vacupet/dialogs/owner/show/show.component";
import {LoadingComponent} from "../../../../components/global/dialogs/loading/loading.component";
import {CollectionService} from "../../../../services/vacupet/collection.service";
import {Owner} from "../../../../interfaces/person/owner";
import {OwnerService} from "../../../../services/vacupet/owner.service";
import {DeleteComponent} from "../../../../components/global/dialogs/crud/delete/delete.component";
import {
  CreateUpdateComponent
} from "../../../../components/vacupet/dialogs/owner/create-update/create-update.component";
import {PetType} from "../../../../interfaces/pet-type";
import {AllergyService} from "../../../../services/vacupet/allergy.service";
import {Allergy} from "../../../../interfaces/allergy";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent {
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
    header: "Apellidos",
    name: "User",
    type: "element",
    elementKey: "Lastname",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Nombre",
    name: "User",
    type: "element",
    elementKey: "Firstname",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Segundo Nombre",
    name: "User",
    type: "element",
    elementKey: "Middlename",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "E-mail",
    name: "User",
    type: "element",
    elementKey: "Email",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Teléfono",
    name: "User",
    type: "element",
    elementKey: "PhoneNumber",
    subtype: "phone",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Fecha de nacimiento",
    name: "User",
    type: "element",
    elementKey: "DateOfBirth",
    subtype: "date",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Dirección",
    name: "Address",
    elementKey: "Address",
    type: "text",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: false,
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
  public data: Owner[] = [];
  public petTypes: PetType[] = [];
  public allergies: Allergy[] = [];
  public reference!: MatDialogRef<any>;


  constructor(private ownerService: OwnerService,
              private allergyService: AllergyService,
              private collectionService: CollectionService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private _dialog: MatDialog,
              private localStore: LocalStorageService) {
  }

  async ngAfterViewInit() {
    await this.loadData();
  }

  async loadData() {
    let promises: any[] = [
      this.getPetTypes(),
      this.getAllergies(),
      this.getOwners()
    ];
    const reference = this.loadingDialog();
    const responsePresentation = await Promise.all(promises);
    reference.close();
  }

  async getOwners() {
    try {
      const response = (await this.ownerService.getOwners())!.data;
      if (response.Success) {
        this.data = response.Response;
      } else
        this.openSnackBar("Something went wrong, try it again later", false);
    } catch (e: any) {
      console.log("Error", e);
      if (e.response.data.Message === 'Token expired')
        logOut(this.localStore, this.router)
      else
        this.openSnackBar("Something went wrong, try it again later", false);
    }
  }

  async getPetTypes() {
    try {
      const response = (await this.collectionService.getCollection("PetTypes"))!.data;
      if (response.Success) {
        this.petTypes = response.Response;
      } else
        this.openSnackBar("Something went wrong, try it again later", false);
    } catch (e: any) {
      console.log("Error", e);
      if (e.response.data.Message === 'Token expired')
        logOut(this.localStore, this.router)
      else
        this.openSnackBar("Something went wrong, try it again later", false);
    }
  }

  async getAllergies() {
    try {
      const response = (await this.allergyService.getAllergies())!.data;
      if (response.Success) {
        this.allergies = response.Response;
      } else
        this.openSnackBar("Something went wrong, try it again later", false);
    } catch (e: any) {
      console.log("Error", e);
      if (e.response.data.Message === 'Token expired')
        logOut(this.localStore, this.router)
      else
        this.openSnackBar("Something went wrong, try it again later", false);
    }
  }

  getOwner(owner: Owner) {
    const headers = [...this.tableHeaders];
    headers.pop();
    return this._dialog.open(ShowComponent, {
      width: '650px',
      disableClose: true,
      data: {
        headers: headers,
        title: `${owner.User!.Firstname} ${owner.User!.Middlename} ${owner.User!.Lastname}`,
        element: owner,
      }
    });
  }

  createUpdateOwner(data: any) {
    const buildData = this.buildOwner();
    const reference = this._dialog.open(CreateUpdateComponent, {
      width: '950px',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        data: buildData,
        element: structuredClone(data.data ?? {}),
        create: data.create
      }
    });
    reference.afterClosed().subscribe(async result => {
      if (result)
        await this.loadData();
    });
  }

  deleteOwner(owner: Owner) {
    const reference = this._dialog.open(DeleteComponent, {
      width: '600px',
      disableClose: true,
      data: {
        element: `${owner.User!.Firstname} ${owner.User!.Middlename} ${owner.User!.Lastname}`,
        onDelete: async () => {
          await this.removeOwner(owner.Id!);
          reference.close()
        }
      }
    });
  }

  async removeOwner(idOwner: string) {
    const reference = this.loadingDialog();
    try {
      const response = (await this.ownerService.deleteOwner(idOwner))!.data;
      if (response.Success) {
        this.getOwners();
        this.openSnackBar("Owner deleted correctly", true);
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

  private buildOwner() {
    return {
      petTypes: this.petTypes,
      allergies: this.allergies,
    };
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
