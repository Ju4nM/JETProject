import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'src/app/config';
import { requestManager } from 'src/app/utils/helpers';
import TemperatureToChart from './interfaces/temperatureToChart.interface';

@Injectable({
  providedIn: 'root'
})
export class TodayChartService {

  endPoint = `${config.apiURL}/temperatures/dataToChart`;

  constructor(
    private http: HttpClient
  ) { }

  async getChartData (): Promise<TemperatureToChart[] | HttpErrorResponse> {
    return await requestManager<TemperatureToChart[]>(
      this.http.get<TemperatureToChart[]>(this.endPoint)
    );
  }
}
