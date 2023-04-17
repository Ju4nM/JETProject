import { Component, ViewChild } from "@angular/core";
import { HistoriesService } from "./histories.service";
import { HttpErrorResponse } from "@angular/common/http";
import History from "./interfaces/history.interface";
import { ModalComponent } from "../../modal/modal.component";

@Component({
	selector: "app-histories",
	templateUrl: "./histories.component.html",
	styleUrls: ["./histories.component.css"],
})
export class HistoriesComponent {

	histories: History[] = [];
	recordToShow: History = {changeType: "", dateOfChange: new Date};
	error: string = "";
	currentRecordDate: string = "";

	@ViewChild("modalError") modalError!: ModalComponent;
	@ViewChild("modalDetails") modalDetails!: ModalComponent;

	constructor(
		private historiesService: HistoriesService
	) {}

	async ngAfterViewInit () {
		await this.loadHistoriesRecords();
	}

	async loadHistoriesRecords () {
		let historiesRecords: HttpErrorResponse | History[] = await this.historiesService.findHistoryRecords();

		if (historiesRecords instanceof HttpErrorResponse) {
			this.error = "Ha ocurrido un error al cargar los datos del historial";
			this.modalError.show();
			return;
		}

		this.histories = historiesRecords.reverse();
	}

	showDetailRecord = (record: History) => {
		this.recordToShow = record;
		let currentDate = new Date(record.dateOfChange);
		this.currentRecordDate = currentDate.toLocaleDateString("ex-MX");
		this.modalDetails.show();
	}
}
