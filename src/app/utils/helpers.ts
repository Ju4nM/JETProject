import { HttpErrorResponse } from "@angular/common/http"
import { firstValueFrom, Observable } from "rxjs"

/**
 * This function was created to convert the Observable that the http.something (http.something is an example) returns, to Promise,
 * this was done to be able to use the async-await
 * @param {Observable<T | HttpErrorResponse>} request - Observable<T> returned from the http.something
 * @returns {Promise<T | HttpErrorResponse>} - This is an object of type specify on the function or a HttpErrorResponse object
 */
export async function requestManager<T> (request: Observable<T | HttpErrorResponse>): Promise<T | HttpErrorResponse> {
  return await firstValueFrom(request).catch(error => error);
}

export function checkSessionVariables (): boolean {
  let variables: any = {
    id: sessionStorage.getItem("id"),
    userName: sessionStorage.getItem("userName"),
    userType: sessionStorage.getItem("userType")
  }

  for (let variable in variables) {
    if (variables[variable] == null) return false;
  }

  return true;
}