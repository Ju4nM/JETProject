import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModalComponent } from '../../modal/modal.component';
import User from './interfaces/user.interface';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  userData: User[] = [];
  isLoading: boolean = true;
  registrationErrors: string[] = [];
  @ViewChild("formErrorsModal") modalErrors!: ModalComponent;

  constructor (
    private userService: UsersService
  ) {
  }
  
  ngOnInit() {
    this.loadData();
  }

  /**
   * Load all users data from the database through the web api
   */
  async loadData () {
    let response: User[] | HttpErrorResponse = await this.userService.getUsers();
    this.responseManager<User[]>(response, (users: User[]) => {
      this.userData = users
      this.isLoading = false;
    });
  }

  /**
   * Check if the both passwords are equals, if both passwords aren't equals then show up the modal with the error
   * else, show up the modal with the form for register an user
   * @param { NgForm } formRegistration - Form pulled from the DOM
   * @returns 
   */
  async registerUser (formRegistration: NgForm) {
    let { password, passwordRepeated } = formRegistration.value;
    
    if (password !== passwordRepeated) {
      this.registrationErrors = ['Las contraseñas no son iguales'];
      this.modalErrors.show();
      return;
    }
    
    this.isLoading = true;
    let response: User | HttpErrorResponse = await this.userService.registerUser(formRegistration.value);

    this.responseManager<User>(response, (newUser: User) => {
      this.userData.push(newUser)
      this.isLoading = false;
    });
  }

  /**
   * Manage the response from the web api, if the web api returns an error, this method shows up the modal with the errors,
   * else, it will execute the function with response pased as a parameter
   * @param {T | HttpErrorResponse} response - Response received from the web api
   * @param responseFunction - Does something using the response as a parameter
   * 
   */
  async responseManager<T> (response: T | HttpErrorResponse, responseFunction: any ) {

    if (!(response instanceof HttpErrorResponse)) {
      await responseFunction(response);
      return;
    }
    if (this.isLoading) this.isLoading = false;
    
    this.registrationErrors = 
      response.status == 400 
        ? response.error.message 
        : ["Error en el servidor"];
    
    this.modalErrors.show();
  }
}
