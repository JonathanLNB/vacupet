import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Component, Inject} from '@angular/core';
import {MatStepperModule} from "@angular/material/stepper";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatOptionModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatChipsModule} from "@angular/material/chips";
import {CdkDropList} from "@angular/cdk/drag-drop";
import {formatDate, logOut, onlyNumber} from "../../../../../utils/utils";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoadingComponent} from "../../../../global/dialogs/loading/loading.component";
import {DeleteComponent} from "../../../../global/dialogs/crud/delete/delete.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {LocalStorageService} from "../../../../../services/global/local-storage.service";
import {OwnerService} from "../../../../../services/vacupet/owner.service";
import {Owner} from "../../../../../interfaces/person/owner";
import {Pet} from "../../../../../interfaces/pet";
import {PetType} from "../../../../../interfaces/pet-type";
import {UserTypes} from "../../../../../enums/user-types";
import {PetItemComponent} from "../../../pet-item/pet-item.component";
import {Allergy} from "../../../../../interfaces/allergy";
import {User} from "../../../../../interfaces/person/user";

export interface CreateUpdateData {
  data: any;
  create: boolean;
  element: Owner;
  onCreateEdit: Function;
}

@Component({
  selector: 'app-create-update-checklist',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  standalone: true,
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    AsyncPipe,
    MatAutocompleteModule,
    MatGridListModule,
    MatOptionModule,
    NgForOf,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    NgIf,
    MatSlideToggleModule,
    MatChipsModule,
    CdkDropList,
    PetItemComponent,
    MatTooltipModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class CreateUpdateComponent {
  public breakpoint: number = 2;
  public create!: boolean;
  public element!: Owner;
  public now: Date;

  public userF!: FormGroup;
  public petF!: FormGroup;

  public petTypes!: PetType[];
  public allergies!: Allergy[];
  public pets!: Pet[];

  constructor(private ownerService: OwnerService,
              private router: Router,
              private localStorage: LocalStorageService,
              private _dialog: MatDialog,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<CreateUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: CreateUpdateData, private _formBuilder: FormBuilder,) {
    this.now = new Date();
    this.create = data.create;
    if (this.create) {
      data.element.User = data.element.User ?? {}
      data.element.Pets = data.element.Pets ?? []
    }
    this.element = data.element;
    this.petTypes = data.data.petTypes;
    this.allergies = data.data.allergies;
    this.pets = this.element.Pets!;

    this.userF = this._formBuilder.group({
      "Firstname": [this.create ? '' : this.element.User!.Firstname, Validators.required],
      "Middlename": [this.create ? '' : this.element.User!.Middlename],
      "Lastname": [this.create ? '' : this.element.User!.Lastname, Validators.required],
      "Address": [this.create ? '' : this.element.Address, Validators.required],
      "Email": [this.create ? '' : this.element.User!.Email, [Validators.required, Validators.email]],
      "PhoneNumber": [this.create ? '' : this.element.User!.PhoneNumber, Validators.required],
      "DateOfBirth": [this.create ? '' : formatDate(this.element.User!.DateOfBirth), Validators.required],
    });
    this.petF = this._formBuilder.group({
      "Pets": [this.evaluatePets(), Validators.required]
    });
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 2;
  }

  addPet() {
    this.pets.push({Gender: false})
  }

  removePet(position: number) {
    if (this.evaluatePetsData(this.pets.at(position)!))
      this.canDeletePet(this.pets.at(position)!, position)
    else
      this.deletePet(position);
  }

  deletePet(position: number) {
    this.pets.splice(position, 1);
  }

  canDeletePet(question: Pet, position: number) {
    const reference = this._dialog.open(DeleteComponent, {
      width: '600px',
      disableClose: true,
      data: {
        element: `this question`,
        onDelete: async () => {
          this.deletePet(position);
          reference.close()
        }
      }
    });
  }

  evaluatePets() {
    let success: boolean = true;
    if (this.element.Pets!.length > 0) {
      for (const pet of this.element.Pets!) {
        if (!this.evaluatePet(pet))
          success = false;
      }
    }
    return success;
  }

  evaluatePet(pet: Pet) {
    return pet.Name && pet.DateOfBirthS && pet.Race && pet.PetType
  }

  evaluatePetsData(pet: Pet) {
    return !(pet.Name || pet.DateOfBirthS || pet.Race || pet.PetType);
  }

  validateData(): boolean {
    this.petF.controls["Pets"].setValue(this.evaluatePets());

    return this.userF.valid &&
      this.petF.controls["Pets"].value
  }

  closeDialog(canUpdate: boolean): void {
    this.dialogRef.close(canUpdate);
  }

  async saveOwner() {
    this.element.User!.Firstname = this.userF.controls["Firstname"].value;
    this.element.User!.Middlename = this.userF.controls["Middlename"].value;
    this.element.User!.Lastname = this.userF.controls["Lastname"].value;
    this.element.User!.Email = this.userF.controls["Email"].value;
    this.element.User!.PhoneNumber = this.userF.controls["PhoneNumber"].value;
    this.element.User!.DateOfBirth = this.userF.controls["DateOfBirth"].value;
    this.element.User!.IsActive = true;
    this.element.User!.UserType = {Id: UserTypes.OWNER}
    this.element.Address = this.userF.controls["Address"].value;
    this.pets.forEach((pet) => {
      pet.DateOfBirth = new Date(pet.DateOfBirthS!)
    })
    this.element.Pets = this.pets;
    const reference = this.loadingDialog();
    try {
      const user: User = {
        Firstname: this.element.User!.Firstname,
        Middlename: this.element.User!.Middlename,
        Lastname: this.element.User!.Lastname,
        Email: this.element.User!.Email,
        PhoneNumber: this.element.User!.PhoneNumber,
        DateOfBirth: this.element.User!.DateOfBirth,
        IsActive: this.element.User!.IsActive,
        UserType: this.element.User!.UserType,
        Owner: {
          Address: this.element.Address,
          Pets: this.element.Pets
        }
      }
      if (!this.create) {
        user.Id = this.element.User!.Id;
        user.Owner!.Id = this.element.Id;
      }
      let response;
      if (this.create)
        response = (await this.ownerService.addOwner(user))!.data;
      else
        response = (await this.ownerService.updateOwner(user))!.data;
      if (response.Success) {
        this.openSnackBar(`Tax code ${this.create ? "created" : "updated"} correctly`, true);
        this.closeDialog(true);
      } else
        this.openSnackBar("Something went wrong, try it again later", false);
    } catch (e: any) {
      console.log("Error", e);
      if (e.response.data.Message === 'Token expired')
        logOut(this.localStorage, this.router)
      else
        this.openSnackBar("Something went wrong, try it again later", false);
    } finally {
      reference.close();
    }
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

  validateOnlyNumber(event: any) {
    return onlyNumber(event);
  }

  protected readonly parseInt = parseInt;
}
