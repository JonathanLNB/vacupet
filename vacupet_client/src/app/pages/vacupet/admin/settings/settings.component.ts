import {Component} from '@angular/core';
import {DataHeaders} from "../../../../interfaces/data-headers";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LocalStorageService} from "../../../../services/global/local-storage.service";
import {getTableHeaders, logOut} from 'src/app/utils/utils';
import {ShowComponent} from "../../../../components/global/dialogs/crud/show/show.component";
import {CreateEditComponent} from "../../../../components/global/dialogs/crud/create-edit/create-edit.component";
import {RequiredData} from "../../../../interfaces/required-data";
import {LoadingComponent} from "../../../../components/global/dialogs/loading/loading.component";
import {SettingService} from "../../../../services/vacupet/setting.service";
import {Setting} from "../../../../interfaces/setting";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
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
    header: "Valor",
    name: "Value",
    elementKey: "Value",
    type: "text",
    isVisibleTable: true,
    isVisibleShow: true,
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
    canDelete: false
  }];
  public data: Setting[] = [];


  constructor(private settingService: SettingService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private _dialog: MatDialog,
              private localStore: LocalStorageService) {
  }

  async ngAfterViewInit() {
    await this.getSettings();
  }

  async getSettings() {
    const reference = this.loadingDialog();
    try {
      const response = (await this.settingService.getSetting())!.data;
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

  async saveSetting(setting: Setting) {
    const reference = this.loadingDialog();
    try {
      let response = (await this.settingService.updateSetting(setting))!.data;
      if (response.Success) {
        this.getSettings();
        this.openSnackBar("Setting updated correctly", true);
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

  getSetting(setting: Setting) {
    const headers = [...this.tableHeaders];
    headers.pop();
    return this._dialog.open(ShowComponent, {
      width: '650px',
      disableClose: true,
      data: {
        headers: headers,
        title: setting.Name,
        element: setting,
      }
    });
  }

  createUpdateSetting(data: any) {
    const headers = this.createCreateEditHeaders(data.data);
    const reference = this._dialog.open(CreateEditComponent, {
      width: '700px',
      disableClose: true,
      data: {
        headers: headers,
        title: `Actualizar Configuración`,
        element: data.data,
        create: false,
        onCreateEdit: async () => {
          let setting: Setting = {
            Id: data.data.Id,
            Name: data.data.Name,
            Description: headers[1][1].value,
            Value: headers[2][1].value,
          }
          await this.saveSetting(setting);
          reference.close();
        }
      }
    });
  }

  createCreateEditHeaders(setting: Setting): any[][] {
    return [
      ['Nombre', <RequiredData>{
        type: 'text',
        name: 'name',
        value: setting ? setting.Name : '',
        readOnlyUpdate: true,
      }],
      ['Descripción', <RequiredData>{
        type: 'text',
        name: 'description',
        value: setting ? setting.Description : '',
        readOnlyUpdate: true
      }],
      ['Valor', <RequiredData>{
        type: 'textarea',
        name: 'value',
        value: setting ? setting.Value : '',
        readOnlyUpdate: false
      }]];
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
