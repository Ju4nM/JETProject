import { HttpClient, HttpErrorResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import appConfig from 'src/app/appConfig';
import { requestManager } from 'src/app/utils/helpers';
import History from './interfaces/history.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoriesService {

  endPoint = `${appConfig.apiURL}/change-history`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * This function does a Http request to get all changelog records from the database
   * The changelog are the change records of the teperature limits or fan on or off done by any user
   * @returns It returns all changelog records
   */
  async findHistoryRecords (): Promise<HttpErrorResponse | History[]> {
    return await requestManager<History[]>(
      this.http.get<History[]>(this.endPoint)
    );
  }
}
