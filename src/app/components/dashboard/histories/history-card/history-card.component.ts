import { Component, Input } from '@angular/core';
import History from '../interfaces/history.interface';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.css']
})
export class HistoryCardComponent {

	@Input() data!: History;
	@Input() showDetails!: (historyData: History) => void;
}
