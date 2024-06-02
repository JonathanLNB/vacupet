import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {DatePipe, NgForOf, NgIf, AsyncPipe} from "@angular/common";
import {formatDate, onlyNumber} from "../../../../../utils/utils";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgxMaskModule} from "ngx-mask";

export interface CreateEditData {
  headers: any[][];
  title: string;
  element: any;
  create: boolean;
  onCreateEdit: Function;
}

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,
    NgForOf,
    DatePipe,
    NgIf,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSlideToggleModule,
    MatTooltipModule,
    NgxMaskModule
  ]
})
export class CreateEditComponent implements OnInit {
  public breakpoint: number = 2;
  public lowerHeaders: string[] = [];
  public headers!: any[][];
  public title!: string;
  public element!: any;
  public create!: boolean;
  public onCreateEdit!: Function;

  constructor(public dialogRef: MatDialogRef<CreateEditComponent>, @Inject(MAT_DIALOG_DATA) public data: CreateEditData,) {
    this.headers = data.headers;
    this.title = data.title;
    this.element = data.element;
    this.create = data.create;
    this.onCreateEdit = data.onCreateEdit;
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 480) ? 1 : 2;
    if (this.headers.length >= 1 && this.headers.length <= 3)
      this.breakpoint = 1
    this.getLowerHeaders();
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 2;
  }

  onFinish() {
    this.onCreateEdit();
  }


  getLowerHeaders() {
    this.lowerHeaders = [];
    for (const header of this.headers)
      this.lowerHeaders.push(header[0].replace(/\s/g, "").toLowerCase());
  }

  formatDateString(date: string): string {
    return formatDate(date);
  }

  validateOnlyNumber(event: any) {
    return onlyNumber(event);
  }

  disableButton() {
    let disabled = false;
    for (const header of this.headers) {
      if (header[1].required) {
        if (header[1].type !== 'boolean')
          if (header[1].type === 'collection') {
            if (!header[1].control.value)
              disabled = true;
          } else {
            if (!header[1].value)
              disabled = true;
          }
      }
    }
    return disabled;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  generateBarcode(model: string) {
    const now: number = Date.now();
    model = `${now}`;
  }
}
