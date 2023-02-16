import { Component } from '@angular/core';
import Section from "./Interfaces/Section.interface";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    currentSection = 4;
    isAdmin: boolean = false;
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

    burgerStatus: boolean = false;
    
    constructor () {
        let tipoUsuario: any = sessionStorage.getItem("tipoUsuario");
        this.isAdmin = tipoUsuario == "0";
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
        this.burgerStatus = !this.burgerStatus;
    }
}
