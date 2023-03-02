import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  endPoint: string = "https://jetapi.onrender.com/users";

  constructor (
    private http: HttpClient
  ) {}

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.endPoint);
  }

  getUser (id: string): Observable<User> {
    return this.http.get<User>(`${this.endPoint}/${id}`);
  }
}