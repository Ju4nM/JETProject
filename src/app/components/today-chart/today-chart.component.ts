import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {Chart} from "chart.js/auto";
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

	constructor (
		private todayChartService: TodayChartService
	) { }

	async ngOnInit () {
		this.createChart();
		// this.loadChartData();
		await this.updater();
	}

	createChart () {
		this.todayChart = new Chart("todayChart", {
			type: "line",
			data: {
				labels: this.labels,
				datasets: [
					{
						label: "Temperaturas",
						data: this.dataToChart,
						borderColor: "rgb(54, 162, 235)",
						backgroundColor: "rgb(75, 192, 192)",
						borderWidth: 1.5,
					},
				],
			},
			options: {
				scales: {
					y: {
						// beginAtZero: true,
						max: 50,
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
				aspectRatio: 2.5,
				plugins: {
					legend: {
						display: false
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

		this.labels = [];
		this.dataToChart = [];
		
		for (let data of chartData) {
			this.labels.push(new Date(data.createdAt).toLocaleTimeString("es-MX"));
			this.dataToChart.push(data.temperature);
		}

		
		this.todayChart.data.labels = this.labels;
		this.todayChart.data.datasets[0].data = this.dataToChart;
		this.todayChart.update();
	}
}
