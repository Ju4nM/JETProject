import { Component } from "@angular/core";
import { Chart, registerables } from "chart.js";

@Component({
	selector: "app-charts",
	templateUrl: "./charts.component.html",
	styleUrls: ["./charts.component.css"],
})
export class ChartsComponent {
	chart: any;
  chart1: any;
  chart2: any;

	ngOnInit () {
    Chart.register(...registerables);
		this.chart = new Chart("chart-0", {
			type: "bar",
			data: {
				labels: [
					"Uno",
					"Dos",
					"Tres",
					"Cuatro",
					"Cinco",
					"Seis",
					"Siete",
				],
				datasets: [
					{
						label: "dataset",
						data: [65, 59, 80, 81, 56, 55, 40],
						backgroundColor: [
							"rgba(255, 99, 132, 0.2)",
							"rgba(255, 159, 64, 0.2)",
							"rgba(255, 205, 86, 0.2)",
							"rgba(75, 192, 192, 0.2)",
							"rgba(54, 162, 235, 0.2)",
							"rgba(153, 102, 255, 0.2)",
							"rgba(201, 203, 207, 0.2)",
						],
						borderColor: [
							"rgb(255, 99, 132)",
							"rgb(255, 159, 64)",
							"rgb(255, 205, 86)",
							"rgb(75, 192, 192)",
							"rgb(54, 162, 235)",
							"rgb(153, 102, 255)",
							"rgb(201, 203, 207)",
						],
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});

    this.chart1 = new Chart("chart-1", {
			type: "bar",
			data: {
				labels: [
					"Uno",
					"Dos",
					"Tres",
					"Cuatro",
					"Cinco",
					"Seis",
					"Siete",
				],
				datasets: [
					{
						label: "dataset",
						data: [65, 59, 80, 81, 56, 55, 40],
						backgroundColor: [
							"rgba(255, 99, 132, 0.2)",
							"rgba(255, 159, 64, 0.2)",
							"rgba(255, 205, 86, 0.2)",
							"rgba(75, 192, 192, 0.2)",
							"rgba(54, 162, 235, 0.2)",
							"rgba(153, 102, 255, 0.2)",
							"rgba(201, 203, 207, 0.2)",
						],
						borderColor: [
							"rgb(255, 99, 132)",
							"rgb(255, 159, 64)",
							"rgb(255, 205, 86)",
							"rgb(75, 192, 192)",
							"rgb(54, 162, 235)",
							"rgb(153, 102, 255)",
							"rgb(201, 203, 207)",
						],
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});

    this.chart2 = new Chart("chart-2", {
			type: "bar",
			data: {
				labels: [
					"Uno",
					"Dos",
					"Tres",
					"Cuatro",
					"Cinco",
					"Seis",
					"Siete",
				],
				datasets: [
					{
						label: "dataset",
						data: [65, 59, 80, 81, 56, 55, 40],
						backgroundColor: [
							"rgba(255, 99, 132, 0.2)",
							"rgba(255, 159, 64, 0.2)",
							"rgba(255, 205, 86, 0.2)",
							"rgba(75, 192, 192, 0.2)",
							"rgba(54, 162, 235, 0.2)",
							"rgba(153, 102, 255, 0.2)",
							"rgba(201, 203, 207, 0.2)",
						],
						borderColor: [
							"rgb(255, 99, 132)",
							"rgb(255, 159, 64)",
							"rgb(255, 205, 86)",
							"rgb(75, 192, 192)",
							"rgb(54, 162, 235)",
							"rgb(153, 102, 255)",
							"rgb(201, 203, 207)",
						],
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});
	}
}
