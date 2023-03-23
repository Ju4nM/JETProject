import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    user: any;

    constructor(
        private router: Router
    ) {
    }

    // async ngOnInit () {
    //     this.user = sessionStorage.getItem("userName");
    //     if (this.user) {
    //         await this.router.navigate(["dashboard"]);
    //     } else {
    //         await this.router.navigate(["login"]);
    //     }
    // }
}
