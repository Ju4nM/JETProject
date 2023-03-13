import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginError: string = "";

    constructor (
        private router : Router,
        private authService: AuthService
    ) {}

    onSubmit(f: NgForm, loginModal: ModalComponent) {
        let {userName, password} = f.value;
        this.validateUser(userName, password, loginModal);
    }

    async validateUser (userName: string, password: string, loginModal: ModalComponent) {
        
        let isLoged: boolean = await this.authService.login({userName, password});

        if (isLoged) {
            await this.router.navigate(["dashboard/about"]);
            // window.location.reload();
            return;
        }

        this.loginError = "Usuario y/o contraseña incorrectas";
        loginModal.show();
    }
}
