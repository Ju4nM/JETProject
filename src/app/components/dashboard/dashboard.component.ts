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
    sections: Section[]= [
        {
            name: "Principal",
            styles: "section section-inactive"
        },
        {
            name: "Usuarios",
            styles: "section section-inactive"
        },
        {
            name: "Graficos",
            styles: "section section-inactive"
        },
        {
            name: "Historiales",
            styles: "section section-inactive"
        },
        {
            name: "Acerca de",
            styles: "section section-active"
        },
    ];

    states: States = {
        burger: false,
        isAdmin: false,
        userMenu: false
    };
    
    constructor (
        private router: Router
    ) {
        let tipoUsuario: any = sessionStorage.getItem("tipoUsuario");
        this.states.isAdmin = tipoUsuario == "0";
    }

    async ngOnInit() {
        let user = sessionStorage.getItem("usuario");
        if (!user) this.router.navigate(["login"]);
    }
    
    changeSection(sectionNumber: number): void {
        if (this.currentSection == sectionNumber) return;
        this.sections = this.sections.map((section: Section) => {
            let { styles } = section;
            section.styles = styles.includes("section-active") ? styles.replace("section-active", "section-inactive") : styles
            return section;
        });

        this.sections[sectionNumber].styles = this.sections[sectionNumber].styles.replace("section-inactive", "section-active");
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
