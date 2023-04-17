import {
	HttpClient,
	HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./interfaces/auth.interface";
import { requestManager } from "src/app/utils/helpers";
import UserAuthorized from "./interfaces/userAuthorized.interface";
import appConfig from "src/app/appConfig";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	endPoint: string = appConfig.apiURL;

	constructor(private http: HttpClient) {}

	async auth(loginData: AuthData): Promise<boolean> {
		let loginRequest: UserAuthorized | HttpErrorResponse = await requestManager<UserAuthorized>(
			this.http.post<UserAuthorized>(`${this.endPoint}/auth`, loginData)
		);

		if (loginRequest instanceof HttpErrorResponse) return false;

		sessionStorage.setItem("userName", loginRequest.userName);
		sessionStorage.setItem("id", loginRequest.id);
		sessionStorage.setItem(
			"userType",
			loginRequest.userType === true ? "1" : "0"
		);

		return true;
	}

	async authConfirm (password: string): Promise<boolean> {
		let data = {
			userName: sessionStorage.getItem("userName"),
			password
		}
		
		let confirmation: UserAuthorized| HttpErrorResponse = await requestManager<UserAuthorized>(
			this.http.post<UserAuthorized>(`${this.endPoint}/auth`, data)
		);

		return !(confirmation instanceof HttpErrorResponse);
	}
}
