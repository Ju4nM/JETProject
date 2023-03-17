import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalComponent } from '../../modal/modal.component';
import { UpdateUser } from './interfaces/updateUser.interface';
import User from './interfaces/user.interface';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  // General variables
  userData: User[] = [];
  isLoading: boolean = true;
  @ViewChild("formErrorsModal") modalErrors!: ModalComponent;
  
  // To do an action like delete or update any user
  actionError: string = "";
  @ViewChild("modalConfirm") modalConfirm!: ModalComponent;
  @ViewChild("actionErrors") modalActionError!: ModalComponent;

  // To register a new user
  registrationErrors: string[] = [];
  @ViewChild("modalForm") modalForm!: ModalComponent;

  // To update any user
  @ViewChild("modalUpdate") modalUpdate!: ModalComponent;
  @ViewChild("udpateForm") updateForm!: NgForm;
  updateValues: UpdateUser = {
    names: "",
    firstLastName: "",
    secondLastName: "",
    passwordRepeated: "",
    userName: "",
    email: "",
    password: "",
    _id: ""
  };

  // To find any user
  userNameToFind: string = "";
  findMode = false;

  constructor (
    private userService: UsersService,
    private authService: AuthService
  ) {}
  
  async ngOnInit() {
    // this.startTimer();
    this.loadData();
  }

  ngOnDestroy () {
    // this.pauseTimer();
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

  async findUser () {
    if (this.userNameToFind.trim() == "") {
      this.actionError = "El nombre de usuario no puede estar vacio";
      this.modalActionError.show();
      return;
    }

    this.isLoading = true;
    await this.responseManager<User>(await this.userService.findByUserName(this.userNameToFind), (user: User) => {
      this.isLoading = false;
      if (user !== null) {
        this.userData = [user];
        this.findMode = true;
        return;
      }

      this.actionError = `No se ha encontrado ningun registro con el nombre de usuario "${this.userNameToFind}"`;
      this.modalActionError.show();
    });
  }

  async endFinding () {
    this.userNameToFind = "";
    this.actionError = "";

    this.findMode = false;
    this.isLoading = true;
    await this.loadData();
  }

  /**
   * Check if the both passwords are equals, if both passwords aren't equals then show up the modal with the error
   * else, show up the modal with the form for register an user
   * @param { NgForm } registrationForm - Form pulled from the DOM
   * @returns 
   */
  async registerUser (registrationForm: NgForm) {
    let { password, passwordRepeated, email } = registrationForm.value;
    
    if (password !== passwordRepeated) {
      this.registrationErrors = ['Las contraseñas no son iguales'];
      this.modalErrors.show();
      return;
    }

    if (email === "") delete registrationForm.value.email;
    
    this.isLoading = true;
    let response: User | HttpErrorResponse = await this.userService.registerUser(registrationForm.value);

    this.responseManager<User>(response, (newUser: User) => {
      this.userData.push(newUser)
      registrationForm.reset();
      this.modalForm.hidden();
      this.isLoading = false;
    });

    if (this.findMode) this.endFinding();
  }
  
  deleteUser = async (id: string) => {
    await this.confirmIdentity("No se ha podido borrar el registro", async () => {
      this.isLoading = true;
      await this.responseManager<User>(await this.userService.deleteUser(id), (userDeleted: User) => {
        this.userData = this.userData.filter((user: User) => user._id !== id);
        this.isLoading = false;
      });
    });
    if (this.findMode) this.endFinding();
  }

  async updateUser() {
    await this.confirmIdentity("No se pudo actualizar el registro", async () => {
      this.isLoading = true;
      await this.responseManager<User>(await this.userService.updateUser(this.updateValues._id, this.updateValues), (userUpdated: User) => {
        this.loadData();
        this.modalUpdate.hidden();
        this.resetUpdateValues();
      });
    });
    if (this.findMode) this.endFinding();
  }

  resetUpdateValues () {
    this.updateValues = {
      names: "",
      firstLastName: "",
      secondLastName: "",
      passwordRepeated: "",
      userName: "",
      email: "",
      password: "",
      _id: ""
    };
  }

  showModalUpdate = (userData: User) => {
    this.modalUpdate.show();
    this.updateValues = { ...userData, passwordRepeated: "" };
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
      response.status == 400 || response.status == 409
        ? response.error.message 
        : ["Error en el servidor"];
    this.modalErrors.show();
  }

  /**
   * The only user can delete or update an user is the admin, therefore, this function shows a modal to confirm
   * the user identity
   * @param errorMessage 
   * @param resultHandler 
   * @returns 
   */
  async confirmIdentity (errorMessage: string, resultHandler: any) {
    let {status, value}: {status: boolean, value: string | null} = await this.modalConfirm.prompt(
      "Introduzca su contraseña para confirmar su identidad",
      "Contraseña",
      "password"
    );

    if (!status || value == null) return;
    
    let authCredentials: boolean = await this.authService.authConfirm(value);

    if (!authCredentials) {
      this.actionError = errorMessage;
      this.modalActionError.show();
      return;
    }

    await resultHandler();
  }
}
