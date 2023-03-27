import { HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { Chart, registerables } from "chart.js";
import { ModalComponent } from "../../modal/modal.component";
import { ControlService } from "./control.service";
import DataDevices from "./interfaces/deviceData";
import { Temperature } from "./interfaces/temperature.interface";

@Component({
	selector: "app-control",
	templateUrl: "./control.component.html",
	styleUrls: ["./control.component.css"],
})
export class ControlComponent {
	
	@ViewChild("errorModal") errorModal!: ModalComponent;
	@ViewChild("warningModal") warningModal!: ModalComponent;

	temperatureLimit!: number;
	currentTemperatureLimit!: number;
	tempLimitDisplayed!: number;	
	fanStatus!: boolean;
	currentTemperature!: number;

	todayChart: any;
	error: string = "";
	warning: string = "";
	isLoading: boolean = true;
	intervals: any = {
		deviceData: null,
		currentTemperature: null
	};

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
		this.stopUpdaters();
	}

	async init () {
		await this.loadDeviceData();
		if (this.isLoading) this.isLoading = false;
		this.updaters();
	}

	updaters () {
		this.intervals.deviceData = setInterval(async () => await this.loadDeviceData(), 2000);
		this.intervals.currentTemperature = setInterval(async () => await this.getCurrentTemperature(), 1000);
	}

	stopUpdaters () {
		clearInterval(this.intervals.deviceData);
		clearInterval(this.intervals.currentTemperature);
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

		this.fanStatus = deviceData.rele.state;
		
		if (this.temperatureLimit === deviceData.sensor.temperatureLimit) return;
		this.temperatureLimit = deviceData.sensor.temperatureLimit;
		this.tempLimitDisplayed = this.temperatureLimit;
		this.currentTemperatureLimit = this.temperatureLimit;
	}

	async toggleFan () {
		let result = await this.controlService.toggleFan();
	
		if (!(result instanceof HttpErrorResponse)) {
			this.loadDeviceData();
			return;
		}
		this.error = `Ha ocurrido un error al ${this.fanStatus ? "apagar" : "encender"} la ventilacion`;
		this.errorModal.show();
	}

	async updateTemperatureLimit() {
		
		if (this.currentTemperatureLimit === this.temperatureLimit) {
			this.warning = "La temperatura que se quiere registrar es la misma que ya se encuentra registrada";
			this.warningModal.show();
			return;
		}
		
		let response = await this.controlService.newTemperature(this.currentTemperatureLimit);

		if (!(response instanceof HttpErrorResponse)) {
			this.loadDeviceData();
			return;
		}

		this.error = "Ocurrio un error al intentar actualizar el limite de temperatura, intentelo mas tarde";
		this.errorModal.show();
	}

	async getCurrentTemperature () {
		let response: Temperature | HttpErrorResponse = await this.controlService.getLastTemeperature();

		if (response instanceof HttpErrorResponse) {
			this.error = "Ocurrio un error al intentar obtener la temperatura actual";
			this.errorModal.show();
			return;
		}

		this.currentTemperature = Number(response.temperature.toFixed(1));
	}
}
