import {Component, OnInit} from '@angular/core';

interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
}

@Component({
    selector: 'app-sitelayout',
    templateUrl: './sitelayout.component.html',
    styleUrls: ['./sitelayout.component.scss'],
})
export class SitelayoutComponent implements OnInit {
    isSideNavCollapsed = false;
    screenWidth = 0;

    onToggleSideNav(data: SideNavToggle): void {
        this.screenWidth = data.screenWidth;
        this.isSideNavCollapsed = data.collapsed;
    }

    constructor() {
    }

    ngOnInit() {
    }

}
