import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";

export interface RequiredData {
  name: string;
  type: string;
  value?: any;
  readOnlyCreate?: boolean;
  readOnlyUpdate?: boolean;
  requiredCreate?: boolean;
  requiredUpdate?: boolean;
  minLength?: number;
  filterOptions?: Observable<any[]>;
  control?: FormControl<string | any>;
  displayFn?: Function;
}
