import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import User from './interfaces/user.interface';
import { requestManager } from 'src/app/utils/helpers';
import appConfig from 'src/app/appConfig';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  endPoint: string = `${appConfig.apiURL}/users`;

  constructor (
    private http: HttpClient
  ) {}

  /**
   * This function returns all users data that are in the database
   * @returns {User[] | HttpErrorResponse} - If an error exists in the server this function will return an HttpErrorResponse
   */
  async getUsers (): Promise<User[] | HttpErrorResponse> {
    return await requestManager<User[]>(
      this.http.get<User[]>(this.endPoint)
    );
  }

  /**
   * This function pulls the data of the user belonging to the id passed to it and returns it
   * @param {string} id - User id
   * @returns {Promise<User | HttpErrorResponse>} - In case the request is done correctly, this function returns the user data, 
   * else, returns an error of type HttpErrorResponse
   */
  async getUser (id: string): Promise<User | HttpErrorResponse> {
    return await requestManager<User>(
      this.http.get<User>(`${this.endPoint}/${id}`)
    );
  }

  /**
   * This function sends the new user data to create a new user record
   * @param {User} newUser - Data of the new user that will be registered on the database
   * @returns {Promise<User | HttpErrorResponse>} - In case the request is done correctly, it returns the data registered
   * with the user id that the database gave, else, returns an error of type HttpErrorResponse
   * with an array that will contain the registration errors
   */
  async registerUser (newUser: User): Promise<User | HttpErrorResponse> {
    return await requestManager<User>(
      this.http.post<User>(this.endPoint, newUser)
    );
  }

  /**
   * Function to send user deletion request to the server
   * @param {string} id - User id
   * @returns {Promise<User | HttpErrorResponse>} - In case the request done correctly, this return an object with the 
   * deleted user data, else, returns an HttpErrorResponse
   * 
   */
  async deleteUser (id: string): Promise<User | HttpErrorResponse> {
    return await requestManager<User>(
      this.http.delete<User>(`${this.endPoint}/${id}`)
    );
  }

  /**
   * Function to update any user record
   * @param {string} id - User id that belongs to the user that we want to update
   * @param {User} userData - The new data that will be registered in the old data place
   * @returns {Promise<User | HttpErrorResponse>} - It returns the user data updated if the request was
   * done successfully, in the other case, returns a HttpErrorResponse error
   */
  async updateUser (id: string, userData: User): Promise<User | HttpErrorResponse> {
    return await requestManager<User>(
      this.http.put<User>(`${this.endPoint}/${id}`, userData)
    );
  }

  /**
   * This function sends request to retrieve the user data that belongs to the userName
   * @param {string} userName 
   * @returns 
   */
  async findByUserName (userName: string): Promise<User | HttpErrorResponse> {
    return await requestManager<User> (
      this.http.get<User>(`${this.endPoint}/${userName}`)
    );
  }

}