import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {Chart} from "chart.js/auto";
import zoomPlugin  from 'chartjs-plugin-zoom';
import { TodayChartService } from './today-chart.service';

@Component({
  selector: 'app-today-chart',
  templateUrl: './today-chart.component.html',
  styleUrls: ['./today-chart.component.css']
})
export class TodayChartComponent {
	todayChart: any;

	labels: string[] = [];
	dataToChart: number[] = [];
	interval: any;
	maxTemperature: number = 50;
	minTemperature: number = 0;

	constructor (
		private todayChartService: TodayChartService
	) { }

	async ngOnInit () {
		Chart.register(zoomPlugin);
		this.createChart();
		await this.updater();
	}

	createChart () {
		this.todayChart = new Chart("todayChart", {
			type: "line",
			data: {
				labels: this.labels,
				datasets: [
					{
						data: this.dataToChart,
						borderColor: "rgb(54, 162, 235)",
						pointBackgroundColor: "rgb(75, 192, 192)",
						backgroundColor: "rgba(54, 162, 235, 0.1)",
						fill: true,
						borderWidth: 1.5,
					},
				],
			},
			options: {
				scales: {
					y: {
						grid: {
							color: "#424242"
						}
					},
					x: {
						grid: {
							color: "#424242"
						}
					}
				},
				// aspectRatio: 3.49,
				aspectRatio: 2.13,
				plugins: {
					legend: {
						display: false
					},
					title: {
						display: true,
						text: "Registro de temperatura actual",
						padding: {
							top: 10,
							bottom: 30
						},
						font: {
							size: 20
						}
					},
					zoom: {
						zoom: {
							wheel: {
								enabled: true
							},
							pinch: {
								enabled: true
							},
							mode: "xy"
						}
					}
				}
			},
		});
	}

	ngOnDestroy () {
		this.stopUpdater();
	}

	async updater () {
		this.interval = setInterval(async () => await this.loadChartData(), 500);
	}

	stopUpdater() {
		clearInterval(this.interval);
	}

	async loadChartData () {
		let chartData = await this.todayChartService.getChartData();
		
		if (chartData instanceof HttpErrorResponse) {
			console.log("Problema al cargar los datos de la grafica")
			return;
		}

		let testLabels = ["--:--:--", "--:--:--", "--:--:--", "--:--:--", "--:--:--"];

		this.labels = [];
		this.dataToChart = [];
		
		this.maxTemperature = this.minTemperature = chartData[0].temperature;
		// this.minTemperature = chartData[0].temperature;	
		for (let data of chartData) {
			if (this.maxTemperature < data.temperature) this.maxTemperature = data.temperature;
			if (this.minTemperature > data.temperature) this.minTemperature = data.temperature;
			this.labels.push(new Date(data.createdAt).toLocaleTimeString("es-MX"));
			this.dataToChart.push(data.temperature);
		}

		
		this.todayChart.data.labels = this.labels.concat(testLabels);
		this.todayChart.data.datasets[0].data = this.dataToChart;
		this.todayChart.options.scales.y.max = Math.floor(this.maxTemperature) + 5;
		this.todayChart.options.scales.y.min = Math.floor(this.minTemperature) - 5;
		this.todayChart.update();
	}
}
