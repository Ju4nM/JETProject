import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { delay, first, firstValueFrom, Observable } from 'rxjs';
import User from './interfaces/user.interface';
import config from "../../../config";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  endPoint: string = `${config.apiURL}/users`;

  constructor (
    private http: HttpClient
  ) {}

  async getUsers (): Promise<User[] | HttpErrorResponse> {
    let response: User[] | HttpErrorResponse = await firstValueFrom(this.http.get<User[]>(this.endPoint)).catch(error => error);
    return response;
  }

  getUser (id: string): Observable<User> {
    return this.http.get<User>(`${this.endPoint}/${id}`);
  }

  async registerUser (newUser: User): Promise<User | HttpErrorResponse> {
    let response: User | HttpErrorResponse = await firstValueFrom(this.http.post<User>(this.endPoint, newUser)).catch(error => error);
    return response;
  }

  deleteUser (id: string) {

  }
}
