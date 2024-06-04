import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {BehaviorSubject} from 'rxjs';
import {formatDate} from "../../../utils/utils";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {DataHeaders} from "../../../interfaces/data-headers";
import {GalleryComponent} from "../../global/dialogs/gallery/gallery.component";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {CdkDrag} from "@angular/cdk/drag-drop";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {GlobalService} from "../../../services/vacupet/global-service.service";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, NgForOf, NgIf, DatePipe, MatButtonModule, MatIconModule, MatGridListModule, NgClass, MatMenuModule, MatCheckboxModule, MatRadioModule, CdkDrag, MatChipsModule, MatTooltipModule],
})
export class DataTableComponent implements OnInit, AfterViewInit {
  private _data = new BehaviorSubject<any[]>([]);
  @Input() tableHeaders!: DataHeaders[];
  @Input() canCreate!: boolean;
  @Input() canDoActions: boolean = true;
  @Input() canFilter: boolean = false;

  @Input()
  set data(value) {
    this._data.next(value);
  };

  get data() {
    return this._data.getValue();
  }

  @Output() element = new EventEmitter();
  @Output() deleteF = new EventEmitter();
  @Output() newEdit = new EventEmitter();
  @Output() checklist = new EventEmitter();
  @Output() changeStatus = new EventEmitter();

  public dataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>();
  public stringHeaders: string[] = [];
  public pagesList: number[] = [10, 25, 50, 100];
  public pages: number[] = [10];
  public entrar: boolean = true;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private _dialog: MatDialog, private globalService: GlobalService) {
  }

  ngOnInit() {
    this._data
      .subscribe(x => {
        this.dataSource = new MatTableDataSource<any[]>(this.data);
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm: any, key: any) => {
            return this.nestedFilterCheck(currentTerm, data, key);
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.getStringHeaders();
        this.getPages();
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
      this.dataSource._updateChangeSubscription();
    }
  }

  nestedFilterCheck(search: string, data: any[], key: any) {
    if (Array.isArray(data[key]) && data[key].length > 0) {
      for (let i = 0; i < data[key].length; i++) {
        if (typeof data[key][i] === 'object') {
          for (const k in data[key][i]) {
            if (data[key][i][k] !== null) {
              search = this.nestedFilterCheck(search, data[key][i], k);
            }
          }
        } else {
          search += data[key][i];
        }
      }
    } else {
      if (typeof data[key] === 'object') {
        for (const k in data[key]) {
          if (data[key][k] !== null) {
            search = this.nestedFilterCheck(search, data[key], k);
          }
        }
      } else {
        search += data[key];
      }
    }
    return search;
  }

  getStringHeaders() {
    this.stringHeaders = [];
    for (const header of this.tableHeaders)
      this.stringHeaders.push(header.header);
  }

  getPages() {
    this.pages = [10];
    const elements: number = this.data.length;
    let maxElementIndex: number = 0;
    if (elements > 0) {
      for (let i = 0; i < this.pagesList.length; i++) {
        if (this.pagesList[i] < elements)
          maxElementIndex = i;
      }
      this.pages = this.pagesList.slice(0, maxElementIndex + 1);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'TaxCodeType':
        case 'UserType':
          return item[property].Name;
        default:
          return item[property];
      }
    };
  }

  formatDateString(date: string): string {
    return formatDate(date);
  }

  sendData(data: any) {
    if (this.entrar)
      this.element.emit(data);
    else
      this.entrar = true;
  }

  openNewUpdateDialog(create: boolean, data: any) {
    this.entrar = false;
    this.newEdit.emit({create: create, data: data});
  }

  deleteDialog(data: any) {
    this.entrar = false;
    this.deleteF.emit(data);
  }

  openChecklist(Id: string) {
    this.entrar = false;
    this.checklist.emit(Id);
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
      const totalSubNames = header.elementKey!.split("|");
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
    return name;
  }

  showImages(images: any[]) {
    const vacupetAPIStorage = this.globalService.decryptENV(environment.vacupetAPIStorage);
    let previews: string[] = [];
    for (const image of images)
      previews.push(`${vacupetAPIStorage}${image.Url}`);
    this._dialog.open(GalleryComponent, {
      panelClass: ['gallery-panel'],
      data: {images: previews, currentIndex: 0},
    });
  }

  updateStatus(element: any) {
    element.Active = !element.Active;
  }

  getPhone(value: string) {
    return value.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
  }
}
