import { Component } from '@angular/core';

interface Section {
    name: string;
    styles: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    currentSection = 0;
    sections: Section[]= [
        {
            name: "Principal",
            styles: "section section-active"
        },
        {
            name: "Usuarios",
            styles: "section section-inactive"
        },
        {
            name: "Graficos",
            styles: "section section-inactive"
        }
    ];

    burgerStatus: boolean = false;
    
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
