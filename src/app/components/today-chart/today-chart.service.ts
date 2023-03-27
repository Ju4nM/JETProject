import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { requestManager } from 'src/app/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class TodayChartService {

  constructor(
    private http: HttpClient
  ) { }

  async getChartData () {
    // await requestManager<
  }
}
