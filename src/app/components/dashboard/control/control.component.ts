import { HttpErrorResponse } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
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

	error: string = "";
	warning: string = "";
	isLoading: boolean = true;
	updaterInterval: any;

	constructor (
		private controlService: ControlService
	) {}

	ngOnInit () {
		this.init();
	}

	ngOnDestroy () {
		this.stopUpdater();
	}

	async init () {
		await this.loadData();
		if (this.isLoading) this.isLoading = false;
		this.updater();
	}

	updater () {
		this.updaterInterval = setInterval(async () => await this.loadData(), 1000);
	}

	stopUpdater () {
		clearInterval(this.updaterInterval);
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

	
	async loadData () {
		let deviceDataLoaded = !(await this.loadDeviceData());
		let currentTemperatureLoaded = !(await this.getCurrentTemperature());
		let msg: string;

		if (deviceDataLoaded && currentTemperatureLoaded)
			msg = "Ha ocurrido un error al intentar cargar los datos del dispositivo y de la temperatura actual";
		else if(deviceDataLoaded)
			msg = "Ha ocurrido un error al intentar cargar los datos del dispositivo";
		else if (currentTemperatureLoaded)
			msg = "Ha ocurrido un error al cargar la temperatura actual";
		else return;
		
		this.error = msg;
		this.errorModal.show();
	}

	// Below functions get the data from the API
	async loadDeviceData () {
		let deviceData: DataDevices | HttpErrorResponse = await this.controlService.getCurrentDevices();

		if (deviceData instanceof HttpErrorResponse) {
			this.temperatureLimit = 0;
			this.tempLimitDisplayed = 0;
			this.fanStatus = false;
			return false;
		}

		this.fanStatus = deviceData.rele.state;

		if (this.temperatureLimit === deviceData.sensor.temperatureLimit) return true;
		this.temperatureLimit = deviceData.sensor.temperatureLimit;
		this.tempLimitDisplayed = this.temperatureLimit;
		this.currentTemperatureLimit = this.temperatureLimit;
		return true;
	}

	async getCurrentTemperature () {
		let response: Temperature | HttpErrorResponse = await this.controlService.getLastTemeperature();

		if (response instanceof HttpErrorResponse) return false;

		this.currentTemperature = Number(response.temperature.toFixed(1));
		return true;
	}
}
