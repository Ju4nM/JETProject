import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from 'src/app/config';
import { requestManager } from 'src/app/utils/helpers';
import DeviceData from './interfaces/deviceData';
import TemperatureLimit from './interfaces/temperatureLimit.interface';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  endPoint: string = `${config.apiURL}`;
  devicesEndPoint: string = `${this.endPoint}/devices`;
  tempLimitEndPoint: string = `${this.endPoint}/limit-temperatures`;

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
}
