import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {formatDate} from "../../../../../utils/utils";
import {MatIconModule} from "@angular/material/icon";
import {DataHeaders} from "../../../../../interfaces/data-headers";
import {MatDividerModule} from "@angular/material/divider";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatChipsModule} from "@angular/material/chips";
import {Owner} from "../../../../../interfaces/person/owner";

export interface ShowData {
  headers: DataHeaders[];
  title: string;
  element: Owner;
}

@Component({
  selector: 'app-show-taxcode',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,
    NgForOf,
    DatePipe,
    NgIf,
    MatIconModule,
    MatDividerModule,
    CdkDropList,
    MatChipsModule,
    CdkDrag
  ]
})
export class ShowComponent implements OnInit {
  public breakpoint: number = 2;
  public headers!: DataHeaders[];
  public title!: string;
  public element!: Owner;

  constructor(private _dialog: MatDialog, public dialogRef: MatDialogRef<ShowComponent>, @Inject(MAT_DIALOG_DATA) public data: ShowData,) {
    this.headers = data.headers;
    this.title = data.title;
    this.element = data.element;
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 480) ? 1 : 2;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 2;
  }

  formatDateString(date: string): string {
    return formatDate(date);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getElement(element: any, header: DataHeaders): string {
    let aux: any = element[header.name];
    let name: string = "";
    const totalSubElements = header.elementKey?.split("|");
    for (let subElement of totalSubElements!) {
      if (typeof aux[subElement] === "string") {
        name += aux[subElement];
      } else {
        aux = aux[subElement];
        name += ", ";
      }
    }
    return name;
  }

  getElements(elements: [], header: DataHeaders): string {
    let name: string = "";
    const totalSubElements = header.elementKey!.split("-");
    if (totalSubElements.length > 1) {
      for (const subElement of totalSubElements) {
        const totalSubNames = subElement.split("|");
        if (totalSubNames.length > 1) {
          elements.forEach((element, index) => {
            name += element[totalSubNames[0]][totalSubNames[1]];
            if (index !== elements.length - 1)
              name += ", ";
          });
        } else {
          elements.forEach((element, index) => {
            name += element[header.elementKey!];
            if (index !== elements.length - 1)
              name += ", ";
          });
        }
      }
    } else {
      elements.forEach((element, index) => {
        name += element[header.elementKey!];
        if (index !== elements.length - 1)
          name += ", ";
      });
    }
    return name;
  }

  getPhone(value: string) {
    return value.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
  }
  protected readonly formatDate = formatDate;
}
