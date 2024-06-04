import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {Pet} from "../../../interfaces/pet";
import {PetType} from "../../../interfaces/pet-type";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {Allergy} from "../../../interfaces/allergy";
import {map, Observable, startWith} from "rxjs";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {formatDate} from "../../../utils/utils";

@Component({
  selector: 'app-pet-item',
  templateUrl: './pet-item.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    FormsModule,
    MatSelectModule,
    MatListModule,
    MatChipsModule,
    MatIconModule,
    CdkDropList,
    CdkDrag,
    NgForOf,
    MatButtonModule,
    NgIf,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatSlideToggleModule
  ],
  styleUrls: ['./pet-item.component.scss']
})
export class PetItemComponent implements OnInit {
  @Input() data!: Pet;
  @Input() petTypes!: PetType[];
  @Input() allergies!: Allergy[];
  @Input() position!: number;
  @Input() create!: boolean;

  @Output() removeElement = new EventEmitter();

  public breakpoint: number = 2;
  public petTypesOptions!: any[];
  public petTypesControl!: FormControl<string | any>;
  public allergiesControl!: FormControl<string | any>;
  public filteredAllergies!: Observable<Allergy[]>;

  public displayAllergy = (element: any): string => {
    return element && element.Name ? element.Name : '';
  }

  ngOnInit() {
    if (!this.create)
      if (this.data.DateOfBirth)
        this.data.DateOfBirthS = formatDate(this.data.DateOfBirth)

    this.data.Allergies = this.data.Allergies ?? [];

    this.createPetType();
    this.getGenerateAllergies();
  }

  createPetType() {
    this.petTypesControl = new FormControl<string | any>('');
    this.petTypesOptions = [...this.petTypes];
    if (this.data.PetType) {
      if (this.data.PetType.Id) {
        for (const op of this.petTypesOptions) {
          if (op.Id === this.data.PetType!.Id)
            this.data.PetType = op
        }
      }
    } else {
      this.data.PetType = this.petTypesOptions[0]
    }
  }

  getGenerateAllergies() {
    this.allergiesControl = new FormControl<string | any>('');
    let options: any[] = [...this.allergies];
    const filter = (element: string): any[] => {
      const filterValue = element.toLowerCase();
      return options.filter(option => option.Name.toLowerCase().includes(filterValue));
    }

    options = options.filter((allergy: any) => {
      return this.data.Allergies!.findIndex((chosenAllergy: any) => {
        return chosenAllergy.Id === allergy.Id
      }) < 0;
    });

    this.filteredAllergies = this.allergiesControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const element = typeof value === 'string' ? value : value.Name;
        if (element !== '')
          return element ? filter(element as string) : options.slice();
        return options.slice();
      }),
    );
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 480) ? 1 : 2;
  }

  removePet() {
    this.removeElement.emit(this.position);
  }

  addAllergy() {
    if (!this.data.Allergies)
      this.data.Allergies = [];
    if (this.allergiesControl.value) {
      this.data.Allergies?.push(this.allergiesControl.value);
      this.getGenerateAllergies();
    }
  }

  removeAllergy(indice: number) {
    this.data.Allergies?.splice(indice, 1);
  }

  protected readonly formatDate = formatDate;
}
