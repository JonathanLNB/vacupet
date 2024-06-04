import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VacupetComponent} from "./vacupet.component";
import {LoginComponent} from "./login/login.component";
import {SitelayoutComponent} from "../../components/vacupet/sitelayout/sitelayout.component";
import {SettingsComponent} from "./admin/settings/settings.component";
import {UserComponent} from "./admin/user/user.component";
import {AuthGuard} from '../../guards/auth.guard';
import {UserGuard} from "../../guards/user.guard";
import {PetComponent} from "./admin/pet/pet.component";
import {OwnerComponent} from "./admin/owner/owner.component";
import {AllergyComponent} from "./admin/allergy/allergy.component";


const routes: Routes = [
  {
    path: '',
    component: VacupetComponent,
    children: [
      {path: "", component: LoginComponent, canActivate: [AuthGuard]},
    ]
  },
  {
    path: 'auth',
    component: SitelayoutComponent,
    children: [
      {path: 'owners', component: OwnerComponent, pathMatch: 'full', canActivate: [UserGuard]},
      {path: 'allergies', component: AllergyComponent, canActivate: [UserGuard]},
      {path: 'pets', component: PetComponent, canActivate: [UserGuard]},
      {path: 'users', component: UserComponent, canActivate: [UserGuard]},
      {path: 'settings', component: SettingsComponent, canActivate: [UserGuard]},
    ]
  },
  {
    path: "**",
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacupetRoutingModule {
}
