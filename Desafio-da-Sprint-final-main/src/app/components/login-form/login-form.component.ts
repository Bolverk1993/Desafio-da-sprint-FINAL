import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginService = inject(LoginService);
  router = inject(Router);
  rememberMe: boolean = false;

  loginForm = new FormGroup({
    nome: new FormControl("", Validators.required),
    senha: new FormControl("", Validators.required)
  });

  acesso() {
    const { nome, senha } = this.loginForm.value;
    
    if (!this.loginForm.valid || !nome || !senha) {
      alert("Existem campos não preenchidos!");
      return;
    }

    this.loginService.login(nome, senha).subscribe({
      error: (err) => {
        if (err.status === 401) {
          alert("Usuário ou senhas incorretos!");
          return;
        }
        alert("Erro interno, tente novamente mais tarde!");
      },
      next: () => {
        if (this.rememberMe) {
          localStorage.setItem('loggedIn', 'true');
        } else {
          sessionStorage.setItem('loggedIn', 'true');
        }
        this.router.navigate(["/home"]);
      }
    });
  }

  toggleRememberMe() {
    this.rememberMe = !this.rememberMe;
  }
}