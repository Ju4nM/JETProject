import { Component } from "@angular/core";
import { Router } from "@angular/router";
import Section from "./interfaces/Section.interface";
import States from "./interfaces/States.interface";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
	currentSection: string = "";
	sections: Map<string, string> = new Map<string, string>([
		["users", "Usuarios"],
		["about", "About"],
		["charts", "Graficas"],
		["control", "Control"],
	]);

	states: States = {
		burger: false,
		isAdmin: false,
		userMenu: false,
	};

	constructor(private router: Router) {
		let tipoUsuario: any = sessionStorage.getItem("tipoUsuario");
		this.states.isAdmin = tipoUsuario == "0";
	}

	async ngOnInit() {
		let user = sessionStorage.getItem("usuario");
		if (!user) this.router.navigate(["login"]);
		let section: string = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
		this.currentSection = this.sections.get(section) ?? "Acerca de";
	}

	changeSection(sectinName: string): void {
		this.currentSection = sectinName;
		this.toggleBurgerMenu();
	}

	logout() {
		sessionStorage.clear();
		window.location.reload();
	}

	toggleBurgerMenu() {
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

	toggleUserMenu() {
		if (this.states.burger) this.toggleBurgerMenu();
		this.states.userMenu = !this.states.userMenu;
	}
}
