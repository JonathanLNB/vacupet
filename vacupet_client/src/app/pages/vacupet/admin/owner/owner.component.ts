import {Component} from '@angular/core';
import {DataHeaders} from "../../../../interfaces/data-headers";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LocalStorageService} from "../../../../services/global/local-storage.service";
import {getTableHeaders, logOut} from "../../../../utils/utils";
import {ShowComponent} from "../../../../components/global/dialogs/crud/show/show.component";
import {LoadingComponent} from "../../../../components/global/dialogs/loading/loading.component";
import {CollectionService} from "../../../../services/vacupet/collection.service";
import {Owner} from "../../../../interfaces/person/owner";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent {
  public tableHeaders: DataHeaders[] = [{
    header: "ID",
    name: "Id",
    type: "text",
    isVisibleTable: false,
    isVisibleShow: true,
    isVisibleCreate: false,
    isVisibleEdit: true,
  }, {
    header: "Name",
    name: "Name",
    type: "text",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Abbreviation",
    name: "Abbreviation",
    type: "text",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }];
  public data: Owner[] = [];


  constructor(private collectionService: CollectionService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private _dialog: MatDialog,
              private localStore: LocalStorageService) {
  }

  async ngAfterViewInit() {
    await this.getOwners();
  }

  async getOwners() {
    const reference = this.loadingDialog();
    try {
      const response = (await this.collectionService.getCollection("Owners"))!.data;
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
  getOwner(owner: Owner) {
    const headers = [...this.tableHeaders];
    return this._dialog.open(ShowComponent, {
      width: '650px',
      disableClose: true,
      data: {
        headers: headers,
        title: `${owner.User.Firstname}`,
        element: owner,
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
