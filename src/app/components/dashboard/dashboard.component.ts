import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Section from "./interfaces/Section.interface";
import States from "./interfaces/States.interface";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    currentSection = 4;
    sections: string[] = ["Control", "Usuarios", "Graficos", "Historiales", "Acerca de"];

    states: States = {
        burger: false,
        isAdmin: false,
        userMenu: false
    };
    
    userInfo: {userName: string | any, userType: boolean};
    
    constructor (
        private router: Router
    ) {
        let userType: any = sessionStorage.getItem("userType");
        this.userInfo = {
            userName: sessionStorage.getItem("userName"),
            userType: userType == "1"
        };
    }
    
    changeSection(sectionNumber: number): void {
        this.currentSection = sectionNumber;
        this.toggleBurgerMenu();
    }

    logout() {
        sessionStorage.clear();
        window.location.reload();
    }

    toggleBurgerMenu () {
        this.states.burger = !this.states.burger;
    }

    toggleOverlay() {
        if (this.states.burger) {
            this.toggleBurgerMenu();
            return;
        } 
        if (this.states.userMenu) {
            this.toggleUserMenu();
            return;
        }
        this.toggleBurgerMenu();
    }

    toggleUserMenu () {
        if (this.states.burger) this.toggleBurgerMenu();
        this.states.userMenu = !this.states.userMenu
    }
}
