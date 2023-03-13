import {
	HttpClient,
	HttpErrorResponse,
	HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "./interfaces/auth.interface";
import config from "../../config";
import { firstValueFrom, Observable } from "rxjs";

interface AuthResponse {
	id: string;
	userName: string;
	userType: boolean;
}

@Injectable({
	providedIn: "root",
})
export class AuthService {
	endPoint: string = config.apiURL;

	constructor(private http: HttpClient) {}

	async login(loginData: AuthData): Promise<boolean> {
		let loginRequest: AuthResponse | HttpErrorResponse =
			await this.requestManager<AuthResponse>(
				this.http.post<AuthResponse>(
					`${this.endPoint}/auth/login`,
					loginData,
          {withCredentials: true}
				)
			);
    
		if (loginRequest instanceof HttpErrorResponse) {
      console.log(loginRequest);
      return false;
    }

		sessionStorage.setItem("userName", loginRequest.userName);
		sessionStorage.setItem("id", loginRequest.id);
		sessionStorage.setItem("userType", loginRequest.userType === true ? "1" : "0");

		return true;
	}

	async requestManager<T>(
		request: Observable<T | HttpErrorResponse>
	): Promise<T | HttpErrorResponse> {
		return await firstValueFrom(request).catch((error) => error);
	}
}
