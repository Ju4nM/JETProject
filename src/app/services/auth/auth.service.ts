import {
	HttpClient,
	HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./interfaces/auth.interface";
import config from "../../config";
import { firstValueFrom, Observable } from "rxjs";

interface AuthResponse {
	id: string;
	userName: string;
	userType: boolean;
    auth_token: string;
}

@Injectable({
	providedIn: "root",
})
export class AuthService {
	endPoint: string = config.apiURL;

	constructor(private http: HttpClient) {}

	async auth(loginData: AuthData): Promise<boolean> {
		let loginRequest: AuthResponse | HttpErrorResponse = await this.requestManager<AuthResponse>(
			this.http.post<AuthResponse>(`${this.endPoint}/auth`, loginData)
		);

		if (loginRequest instanceof HttpErrorResponse) return false;

		sessionStorage.setItem("userName", loginRequest.userName);
		sessionStorage.setItem("id", loginRequest.id);
		sessionStorage.setItem(
			"userType",
			loginRequest.userType === true ? "1" : "0"
		);
		document.cookie += `auth_token=${loginRequest.auth_token};`;

		return true;
	}

	async authConfirm (password: string): Promise<boolean> {
		let data = {
			userName: sessionStorage.getItem("userName"),
			password
		}
		
		let confirmation: AuthResponse | HttpErrorResponse = await this.requestManager<AuthResponse>(
			this.http.post<AuthResponse>(`${this.endPoint}/auth`, data)
		);

		return !(confirmation instanceof HttpErrorResponse);
	}

	async requestManager<T>(request: Observable<T | HttpErrorResponse>): Promise<T | HttpErrorResponse> {
		return await firstValueFrom(request).catch((error) => error);
	}
}
