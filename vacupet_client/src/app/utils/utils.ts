import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import {Router} from "@angular/router";
import {DataHeaders} from "../interfaces/data-headers";
import {LocalStorageService} from "../services/global/local-storage.service";

function formatDate(oldDate: any): string {
  let newDate, year, month, day;
  if (oldDate instanceof Date)
    newDate = new Date(oldDate.getTime());
  else
    newDate = new Date(oldDate.replace(/-/g, '\/').replace(/T.+/, ''));
  day = '' + newDate.getDate();
  month = '' + (newDate.getMonth() + 1);
  year = newDate.getFullYear();
  if (month.length < 2) {
    month = '0' + month
  }
  if (day.length < 2) {
    day = '0' + day
  }
  return [year, month, day].join('-')
}

async function logOut(localStore: LocalStorageService, router: Router) {
  localStore.clearData();
  await firebase.auth().signOut();
  router.navigate(["checklist"]);

}

function onlyNumber($event: any) {
  let inputValue = $event.target.value;
  let sanitizedValue = inputValue.replace(/[^\d.,\-()]|(?<=\.\d*)\./g, '');
  $event.target.value = sanitizedValue;
}

function getTableHeaders(headers: DataHeaders[]): DataHeaders[] {
  const tableHeaders: DataHeaders[] = [];
  for (const header of headers)
    if (header.isVisibleTable)
      tableHeaders.push(header);
  return tableHeaders;
}

function openFile(ruta: string) {
  window.open(ruta, '_blank')!.focus();
}

export {
  logOut,
  onlyNumber,
  formatDate,
  getTableHeaders,
  openFile,
 }
