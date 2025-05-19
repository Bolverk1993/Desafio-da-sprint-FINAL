import { Component, Input, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-table',
  standalone: true,  // Adicionado
  imports: [CommonModule],  // Adicionado
  templateUrl: './car-table.component.html',
  styleUrl: './car-table.component.css'
})
export class CarTableComponent {
  @Input() vin: string = "";
  @Input() odometro: number = 0;
  @Input() nivelCombustivel: number = 0;
  @Input() status: string = "";
  @Input() lat: number = 0;
  @Input() long: number = 0;

  dashboardService = inject(DashboardService);

  onEditVin(event: Event) {
    const vin = (event.target as HTMLInputElement).value;
    console.log('Novo VIN:', vin); // Adicione para debug

    this.dashboardService.getVinInfos(vin).subscribe({
      error: (err) => {
        console.error('Erro ao buscar informações:', err); // Adicione para debug
      },
      next: (vinInfos) => {
        this.odometro = vinInfos.odometro;
        this.nivelCombustivel = vinInfos.nivelCombustivel;
        this.status = vinInfos.status;
        this.lat = vinInfos.lat;
        this.long = vinInfos.long;
      }
    });
  }
}