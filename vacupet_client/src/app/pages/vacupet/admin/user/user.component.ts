import {AfterViewInit, Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LocalStorageService} from "../../../../services/global/local-storage.service";
import {UserService} from "../../../../services/vacupet/user.service";
import {LoadingComponent} from "../../../../components/global/dialogs/loading/loading.component";
import {ShowComponent} from "../../../../components/global/dialogs/crud/show/show.component";
import {DeleteComponent} from "../../../../components/global/dialogs/crud/delete/delete.component";
import {CreateEditComponent} from "../../../../components/global/dialogs/crud/create-edit/create-edit.component";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {CollectionService} from "../../../../services/vacupet/collection.service";
import {formatDate, getTableHeaders, logOut} from 'src/app/utils/utils';
import {DataHeaders} from "../../../../interfaces/data-headers";
import {RequiredData} from "../../../../interfaces/required-data";
import {User} from "../../../../interfaces/person/user";
import {GlobalService} from "../../../../services/vacupet/global-service.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit {
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
    name: "Lastname",
    elementKey: "Lastname",
    type: "text",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Nombre",
    name: "Firstname",
    elementKey: "Firstname",
    type: "text",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Segundo Nombre",
    name: "Middlename",
    elementKey: "Middlename",
    type: "text",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "E-mail",
    name: "Email",
    elementKey: "Email",
    type: "text",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Teléfono",
    name: "PhoneNumber",
    elementKey: "PhoneNumber",
    type: "phone",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
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
    header: "Fecha de creación",
    name: "CreatedAt",
    elementKey: "CreatedAt",
    type: "date",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: false,
    isVisibleEdit: true,
  }, {
    header: "Ultima conexión",
    name: "UpdatedAt",
    elementKey: "UpdatedAt",
    type: "date",
    isVisibleTable: false,
    isVisibleShow: true,
    isVisibleCreate: false,
    isVisibleEdit: false,
  }, {
    header: "Tipo de usuario",
    name: "UserType",
    elementKey: "Name",
    type: "element",
    isVisibleTable: true,
    isVisibleShow: true,
    isVisibleCreate: true,
    isVisibleEdit: true,
  }, {
    header: "Activo",
    name: "IsActive",
    elementKey: "IsActive",
    type: "boolean",
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
  public data: any = [];
  public usertypes: any = [];
  public reference!: MatDialogRef<any>;
  public now: Date = new Date();


  constructor(private userService: UserService,
              private collectionService: CollectionService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private _dialog: MatDialog,
              private localStore: LocalStorageService,
              private globalService: GlobalService) {
  }

  async ngAfterViewInit() {
    await this.getUsers();
    await this.getUserTypes();
  }

  async getUsers() {
    this.reference = this.loadingDialog();
    try {
      const response = (await this.userService.getUsers())!.data;
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

  async getUserTypes() {
    try {
      const response = (await this.collectionService.getCollection("UsersTypes"))!.data;
      if (response.Success) {
        this.usertypes = response.Response;
      } else
        this.openSnackBar("Something went wrong, try it again later", false);
      this.reference.close();
    } catch (e: any) {
      console.log("Error", e);
      if (e.response.data.Message === 'Token expired')
        logOut(this.localStore, this.router)
      else
        this.openSnackBar("Something went wrong, try it again later", false);
      this.reference.close();
    }
  }

  async removeUser(idUser: string) {
    const reference = this.loadingDialog();
    try {
      const response = (await this.userService.deleteUser(idUser))!.data;
      if (response.Success) {
        this.getUsers();
        this.openSnackBar("User deleted correctly", true);
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

  async saveUser(user: any, create: boolean) {
    const reference = this.loadingDialog();
    try {
      let response;
      if (create)
        response = (await this.userService.addUser(user))!.data;
      else
        response = (await this.userService.updateUser(user))!.data;

      if (response.Success) {
        this.getUsers();
        this.reference.close();
        this.openSnackBar(`User ${create ? "created" : "updated"} correctly`, true);
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

  getUser(user: any) {
    const headers = [...this.tableHeaders];
    headers.pop();
    return this._dialog.open(ShowComponent, {
      width: '650px',
      disableClose: true,
      data: {
        headers: headers,
        title: `${user.Name} ${user.LastName}`,
        element: user,
      }
    });
  }

  createUpdateUser(data: any) {
    const headers = this.createCreateEditHeaders(data.data);
    const reference = this._dialog.open(CreateEditComponent, {
      width: '600px',
      disableClose: true,
      data: {
        headers: headers,
        title: data.create ? `Create User` : `Update User`,
        element: structuredClone(data.data),
        create: data.create,
        onCreateEdit: async () => {
          let user: User = {
            Firstname: headers[0][1].value,
            Middlename: headers[1][1].value ?? "",
            Lastname: headers[2][1].value,
            Email: headers[3][1].value,
            Password: this.globalService.encrypt(headers[4][1].value),
            PhoneNumber: headers[5][1].value.replace(/\D+/g, ''),
            DateOfBirth: headers[6][1].value,
            UserType: headers[7][1].control.value,
            IsActive: headers[8][1].value,
            Id: undefined,
            FirebaseId: undefined,
            UpdatedAt: this.now,
            CreatedAt: this.now
          }

          if (!data.create) {
            user.Id = data.data.Id;
            user.FirebaseId = data.data.FirebaseId;
          } else {
            delete user.Id
            delete user.FirebaseId
          }

          if (!user.Password)
            delete user.Password

          await this.saveUser(user, data.create);
          reference.close();
        }
      }
    });
  }

  createCreateEditHeaders(user: User): any[][] {
    let userTypeControl = new FormControl<string | any>('');
    const options: any[] = [...this.usertypes];
    const filter = (usertype: string): any[] => {
      const filterValue = usertype.toLowerCase();
      return options.filter(option => option.Name.toLowerCase().includes(filterValue));
    }
    let filteredOptions: Observable<any[]>;

    filteredOptions = userTypeControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const usertype = typeof value === 'string' ? value : value?.Name;
        return usertype ? filter(usertype as string) : options.slice();
      }),
    );

    if (user) {
      if (user.UserType!.Id) {
        for (const op of options) {
          if (op.Id === user.UserType!.Id)
            userTypeControl = new FormControl<string | any>(op);
        }
      }
    }

    return [
      ['Firstname', <RequiredData>{
        type: 'text',
        name: 'first',
        value: user ? user.Firstname : '',
        requiredCreate: true,
        requiredUpdate: true
      }],
      ['Middlename', <RequiredData>{
        type: 'text',
        name: 'middlename',
        value: user ? user.Middlename : '',
        requiredCreate: false,
        requiredUpdate: false
      }],
      ['Lastname', <RequiredData>{
        type: 'text',
        name: 'lastname',
        value: user ? user.Lastname : '',
        requiredCreate: true,
        requiredUpdate: true
      }],
      ['E-mail', <RequiredData>{
        type: 'text',
        name: 'email',
        value: user ? user.Email : '',
        requiredCreate: true,
        requiredUpdate: true
      }],
      ['Password', <RequiredData>{
        type: 'password',
        name: 'password',
        value: '',
        requiredCreate: true,
        requiredUpdate: false,
      }],
      ['Phone', <RequiredData>{
        type: 'phone',
        name: 'phone',
        minLength: 10,
        value: user ? user.PhoneNumber : '',
        requiredCreate: true,
        requiredUpdate: true
      }],
      ['Birthdate', <RequiredData>{
        type: 'date',
        name: 'birth',
        value: user ? formatDate(user.DateOfBirth) : '',
        requiredCreate: true,
        requiredUpdate: true
      }],
      ['User type', <RequiredData>{
        type: 'collection',
        name: 'Name',
        requiredCreate: true,
        requiredUpdate: true,
        filterOptions: filteredOptions,
        control: userTypeControl,
        displayFn: (userType: any): string => {
          return userType && userType.Name ? userType.Name : '';
        },
      }],
      ['Is the user active?', {
        type: 'boolean',
        name: 'IsActive',
        value: user ? user.IsActive : true,
        requiredCreate: true,
        requiredUpdate: true,
      }]];
  }

  deleteUser(user: User) {
    const reference = this._dialog.open(DeleteComponent, {
      width: '600px',
      disableClose: true,
      data: {
        element: `user ${user.Firstname} ${user.Middlename} ${user.Lastname}: ${user.UserType!.Name}`,
        onDelete: async () => {
          await this.removeUser(user.Id!);
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
