import { Component, inject } from '@angular/core';
import { SaudacaoComponent } from '../../components/saudacao/saudacao.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SaudacaoComponent,MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  router = inject(Router)

}
