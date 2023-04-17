import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { requestManager } from 'src/app/utils/helpers';
import TemperatureToChart from './interfaces/temperatureToChart.interface';
import appConfig from 'src/app/appConfig';

@Injectable({
  providedIn: 'root'
})
export class TodayChartService {

  endPoint = `${appConfig.apiURL}/temperatures/dataToChart`;

  constructor(
    private http: HttpClient
  ) { }

  async getChartData (): Promise<TemperatureToChart[] | HttpErrorResponse> {
    return await requestManager<TemperatureToChart[]>(
      this.http.get<TemperatureToChart[]>(this.endPoint)
    );
  }
}
