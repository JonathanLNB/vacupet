import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {formatDate} from "../../../../../utils/utils";

export interface DeleteData {
  element: string;
  onDelete: Function;
}
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,
    DatePipe,
    NgIf
  ]
})
export class DeleteComponent {
  public element!: string;
  public onDelete!: Function;

  constructor(public dialogRef: MatDialogRef<DeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: DeleteData,) {
    this.element = data.element;
    this.onDelete = data.onDelete;
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.onDelete();
  }

}
