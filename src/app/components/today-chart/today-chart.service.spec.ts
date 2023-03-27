import { TestBed } from '@angular/core/testing';

import { TodayChartService } from './today-chart.service';

describe('TodayChartService', () => {
  let service: TodayChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodayChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
