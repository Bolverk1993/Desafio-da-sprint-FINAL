import { Component } from '@angular/core';
import { Contato } from '../../models/contatos';
import { HeaderComponent } from '../../components/header/header.component';
import { ContatoFormComponent } from '../../components/contato-form/contato-form.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-contato',
  imports: [HeaderComponent,ContatoFormComponent, FooterComponent ],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {
  onFormSubmit(formData: Contato) { 
    console.log('Dados tipados:', formData);
    
    
    console.log('Nome:', formData.nome); 
    console.log('Método de contato:', formData.contato); 
    
  
  }
}
