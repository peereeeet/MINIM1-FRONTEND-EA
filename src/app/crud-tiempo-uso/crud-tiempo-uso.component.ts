import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { TiempoUso } from '../models/tiempo-uso.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-tiempo-uso',
  templateUrl: './crud-tiempo-uso.component.html',
  styleUrls: ['./crud-tiempo-uso.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class CrudTiempoUsoComponent implements OnInit {
    sessionTimes: TiempoUso[] = [];
	userId: string = 'user-id-placeholder'; // Reemplaza con el ID del usuario actual

	constructor(private apiService: ApiService) {}

	ngOnInit(): void {
		this.getSessionTimes();
	}

	getSessionTimes(): void {
		this.apiService.getSessionTimes(this.userId).subscribe(
			(data) => {
				this.sessionTimes = data;
			},
			(error) => {
				console.error('Error fetching session times', error);
			}
		);
	}

	createSessionTime(): void {
		const newSessionTime: TiempoUso = {
			usuarioId: this.userId,
			fechaInicio: new Date(),
			fechaFin: new Date(),
			tiempoTotal: 3600 // Ejemplo de duración en segundos
		};

		this.apiService.createSessionTime(newSessionTime).subscribe(
			(data) => {
				this.sessionTimes.push(data);
			},
			(error) => {
				console.error('Error creating session time', error);
			}
		);
	}

	updateSessionTime(sessionTime: TiempoUso): void {
		if (!sessionTime._id) {
			console.error('Session time ID is missing');
			return;
		}

		this.apiService.updateSessionTime(sessionTime._id, sessionTime).subscribe(
			(data) => {
				const index = this.sessionTimes.findIndex(st => st._id === data._id);
				if (index !== -1) {
					this.sessionTimes[index] = data;
				}
			},
			(error) => {
				console.error('Error updating session time', error);
			}
		);
	}

	deleteSessionTime(id: string): void {
		this.apiService.deleteSessionTime(id).subscribe(
			() => {
				this.sessionTimes = this.sessionTimes.filter(st => st._id !== id);
			},
			(error) => {
				console.error('Error deleting session time', error);
			}
		);
	}
}
