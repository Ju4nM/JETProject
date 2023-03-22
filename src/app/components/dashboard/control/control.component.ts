import { HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { Chart, registerables } from "chart.js";
import { ModalComponent } from "../../modal/modal.component";
import { ControlService } from "./control.service";
import DataDevices from "./interfaces/deviceData";

@Component({
	selector: "app-control",
	templateUrl: "./control.component.html",
	styleUrls: ["./control.component.css"],
})
export class ControlComponent {
	
	@ViewChild("errorModal") errorModal!: ModalComponent;

	temperatureLimit!: number;
	tempLimitDisplayed!: number;	
	fanStatus!: boolean;

	todayChart: any;
	error: string = "";
	isLoading: boolean = true;

	updaterInterval: any;

	constructor (
		private controlService: ControlService
	) {}

	ngOnInit () {
		this.init();

		Chart.register(...registerables);

		this.todayChart = new Chart("todayChart", {
			type: "line",
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
			},
		});
	}

	ngOnDestroy () {
		this.stopUpdater();
	}

	async init () {
		await this.loadDeviceData();
		if (this.isLoading) this.isLoading = false;
		this.updater();
	}

	updater () {
		this.updaterInterval = setInterval(async () => await this.loadDeviceData(), 1000);
	}

	stopUpdater () {
		clearInterval(this.updaterInterval);
	}

	async loadDeviceData () {
		let deviceData: DataDevices | HttpErrorResponse = await this.controlService.getCurrentDevices();

		if (deviceData instanceof HttpErrorResponse) {
			this.error = "Ha ocurrido un error al cargar los datos del servidor";

			this.temperatureLimit = 0;
			this.tempLimitDisplayed = 0;
			this.fanStatus = false;
			this.errorModal.show();
			return;
		}

		this.temperatureLimit = deviceData.sensor.temperatureLimit;
		this.tempLimitDisplayed = deviceData.sensor.temperatureLimit;
		this.fanStatus = deviceData.rele.state;
	}

	async toggleFan () {
		let result = await this.controlService.toggleFan();
	
		if (result instanceof HttpErrorResponse) {
			this.error = `Ha ocurrido un error al ${this.fanStatus ? "apagar" : "encender"} la ventilacion`;
			this.errorModal.show();
			return;
		}
		this.loadDeviceData();
	}
}
