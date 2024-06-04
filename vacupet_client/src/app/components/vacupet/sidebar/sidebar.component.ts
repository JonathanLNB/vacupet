import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {Component, Output, EventEmitter, OnInit, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {fadeInOut, INavbarData} from './helper';
import {logOut} from "../../../utils/utils";
import packageInfo from 'package.json';
import "firebase/compat/auth";
import {LocalStorageService} from "../../../services/global/local-storage.service";
import {UserType} from "../../../interfaces/user-type";
import {UserTypes} from "../../../enums/user-types";
import {navbarDataAdmin} from "./nav-data";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarDataAdmin;
  multiple: boolean = false;
  icon: string = "fal fa-bars";
  version: string = ""
  usertype: string = ""
  username: string = ""

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor(public router: Router, public localStore: LocalStorageService) {
    //const usertype: UserType = JSON.parse(this.localStore.getData("usertype") ?? "{}");
    this.navData =  navbarDataAdmin;
  }

  ngOnInit(): void {
    this.username = this.localStore.getData("username")!!;
    this.usertype = JSON.parse(this.localStore.getData("usertype")!!).Name;
    this.version = `v${packageInfo.version}`;
    this.screenWidth = window.innerWidth;
  }


  toggleCollapse(): void {
    if (this.collapsed)
      this.icon = "fal fa-bars";
    else
      this.icon = "fal fa-times close-icon"
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.icon = "fal fa-bars";
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (item.routeLink === "logout") {
      logOut(this.localStore, this.router);
      return;
    }
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}
