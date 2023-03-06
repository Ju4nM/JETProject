import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import User from './interfaces/user.interface';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  userData: User[] = [];
  registrationErrors: string[] = [];

  states = {
    userForm: false,
    formErrors: false,
    spinner: false,
  };

  constructor (
    private userService: UsersService
  ) {
  }
  
  ngOnInit() {
    this.loadData();
  }

  loadData () {
    this.states.spinner = true;
    this.userService.getUsers()
      .subscribe(
        (res: User[]) => {
          this.userData = res
          this.states.spinner = false;
        } 
      );
  }

  toggleRegistrationForm () {
    this.states.userForm = !this.states.userForm;
  }

  toggleFormErrors () {
    this.states.formErrors = !this.states.formErrors;
    this.toggleRegistrationForm();
  }

  registerUser (form: NgForm) { 
    console.log(form.value);
    let {password, passwordRepeated} = form.value;
    if (password !== passwordRepeated) {
      alert("Las contraseñas no son iguales");
      return;
    }
    this.userService.registerUser(form.value).subscribe({
      next: (value: User) => {
        this.userData.push(value);
        this.toggleRegistrationForm();
      },
      error: (err: any) => {
        if (err.error.statusCode == 400) {
          this.registrationErrors = err.error.message;
          this.toggleFormErrors();
        }
      }
    });
  }

  deleteUser (id: string) {
    let response = this.userService.deleteUser(id);
    console.log(response);
    response.subscribe((res: User) => {
      console.log(res);
      this.deleteUserLocally(res._id);
    });
  }

  deleteUserLocally (id: string) {
    let newData: User[] = this.userData.filter((user: User) => user._id !== id);
    this.userData = newData;
  }
}
