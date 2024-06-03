import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {environment} from "../environments/environment";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoadingComponent} from './components/global/dialogs/loading/loading.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {DataTableComponent} from "./components/vacupet/data-table/data-table.component";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatChipsModule} from "@angular/material/chips";
import {MatStepperModule} from "@angular/material/stepper";
import {RouterOutlet} from "@angular/router";
import {MatDividerModule} from "@angular/material/divider";
import {MatSelectModule} from "@angular/material/select";
import {NgxMaskModule} from "ngx-mask";
import {VacupetComponent} from "./pages/vacupet/vacupet.component";
import {AngularFireRemoteConfigModule} from "@angular/fire/compat/remote-config";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    VacupetComponent,
    LoadingComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireRemoteConfigModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatIconModule,
    MatOptionModule,
    MatSlideToggleModule,
    DataTableComponent,
    CdkDropList,
    MatChipsModule,
    MatStepperModule,
    RouterOutlet,
    CdkDrag,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
