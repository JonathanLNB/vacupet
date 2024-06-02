import {Component, HostListener, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  imports: [
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
  standalone: true
})
export class GalleryComponent {
  @Input() images: string[] = [];
  public currentIndex = 0;
  public close: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    images: string[],
    currentIndex: number
  }, public dialogRef: MatDialogRef<GalleryComponent>) {
    this.currentIndex = data.currentIndex;
    this.images = data.images;
  }

  closeGallery(): void {
    if (this.close)
      this.dialogRef.close();
    this.close = true;
  }

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  nextImage(): void {
    if (this.currentIndex + 1 < this.images.length) {
      this.currentIndex = this.currentIndex + 1;
      this.close = false;
    }
  }

  prevImage(): void {
    if (this.currentIndex - 1 >= 0) {
      this.currentIndex = this.currentIndex - 1;
      this.close = false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'ArrowLeft') {
      this.prevImage();
    }
  }

}
