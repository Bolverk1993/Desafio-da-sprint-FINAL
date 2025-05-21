import { Component } from '@angular/core';
import { ContatoFormComponent } from '../../components/contato-form/contato-form.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-contato',
  imports: [ContatoFormComponent,HeaderComponent,FooterComponent],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {

}
