import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { SaudacaoComponent } from '../../components/saudacao/saudacao.component';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent,SaudacaoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
