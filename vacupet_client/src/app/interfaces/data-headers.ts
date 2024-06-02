export interface DataHeaders {
  header: string;
  name: string;
  type: string;
  elementKey?: string;
  isVisibleTable?: boolean;
  isVisibleShow?: boolean;
  isVisibleCreate?: boolean;
  isVisibleEdit?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  checklist?: boolean;
  notSortable?: boolean;
}
