import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    // user: any = "";
    // password: any = "";

    // validateUser(event: SubmitEvent) {
    // validateUser() {
    //     if (this.user !== "admin" && this.password !== "123") {
    //         alert("Usuario y / o contraseña incorrectas");
    //         return;
    //     }
    //     sessionStorage.setItem("usuario", this.user);
    //     sessionStorage.setItem("clave", this.password);
    //     window.location.reload();
    // }

    onSubmit(f: NgForm) {
        console.log(f.value);
        let {userName, password} = f.value;
        console.log(userName);
        console.log(password);
        if (userName !== "admin" && password !== "123") {
            alert("Usuario y / o contraseña incorrectas");
            return;
        }
        sessionStorage.setItem("usuario", userName);
        sessionStorage.setItem("clave", password);
        window.location.reload();
    }
}
