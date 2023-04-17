import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { requestManager } from 'src/app/utils/helpers';
import DeviceData from './interfaces/deviceData';
import { Temperature } from './interfaces/temperature.interface';
import TemperatureLimit from './interfaces/temperatureLimit.interface';
import appConfig from 'src/app/appConfig';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  endPoint: string = `${appConfig.apiURL}`;
  devicesEndPoint: string = `${this.endPoint}/devices`;
  tempLimitEndPoint: string = `${this.endPoint}/limit-temperatures`;
  tempEndPoint: string = `${this.endPoint}/temperatures/last`;

  constructor(
    private http: HttpClient
  ) { }

  async getCurrentDevices (): Promise<DeviceData | HttpErrorResponse> {
    return await requestManager<DeviceData>(
      this.http.get<DeviceData>(`${this.devicesEndPoint}/current`)
    );
  }

  async newTemperature (temperature: number): Promise<TemperatureLimit | HttpErrorResponse> {
    let newTemperature: TemperatureLimit = {
      limitTemperature: temperature,
      user: sessionStorage.getItem("id") ?? ""
    };

    return await requestManager<TemperatureLimit> (
      this.http.post<TemperatureLimit>(`${this.tempLimitEndPoint}`, newTemperature)
    );
  }

  async toggleFan (): Promise<Object | HttpErrorResponse> {
    let dataToSend = {
      user: sessionStorage.getItem("id") ?? ""
    }

    return await requestManager (
      this.http.post(`${this.devicesEndPoint}/toggleFan`, dataToSend)
    );
  }

  async getLastTemeperature(): Promise<Temperature | HttpErrorResponse> {
    return await requestManager<Temperature> (
      this.http.get<Temperature>(this.tempEndPoint)
    );
  }
}
