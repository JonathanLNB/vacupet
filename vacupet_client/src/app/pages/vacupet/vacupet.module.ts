import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VacupetRoutingModule} from "./vacupet-routing.module";
import {LoginComponent} from "./login/login.component";
import {SidebarComponent} from "../../components/vacupet/sidebar/sidebar.component";
import {SublevelMenuComponent} from "../../components/vacupet/sidebar/sublevel-menu.component";
import {SitelayoutComponent} from "../../components/vacupet/sitelayout/sitelayout.component";
import {BodyComponent} from "../../components/vacupet/sitelayout/body/body.component";
import {MatCardModule} from "@angular/material/card";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {UserComponent} from './admin/user/user.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from '@angular/material/dialog';
import {DataTableComponent} from "../../components/vacupet/data-table/data-table.component";
import {AllergyComponent} from "./admin/allergy/allergy.component";
import {PetComponent} from "./admin/pet/pet.component";
import {SettingsComponent} from "./admin/settings/settings.component";
import {OwnerComponent} from "./admin/owner/owner.component";


@NgModule({
  declarations: [
    LoginComponent,
    SidebarComponent,
    SublevelMenuComponent,
    SitelayoutComponent,
    BodyComponent,
    AllergyComponent,
    PetComponent,
    SettingsComponent,
    OwnerComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    VacupetRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    DataTableComponent,
  ]
})
export class VacupetModule {
}
