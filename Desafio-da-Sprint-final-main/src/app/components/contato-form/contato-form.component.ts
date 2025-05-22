import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Contato } from '../../models/contatos';

@Component({
  selector: 'app-contato-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contato-form.component.html',
  styleUrls: ['./contato-form.component.css']
})
export class ContatoFormComponent {
  @Output() formSubmit = new EventEmitter<Contato>();
  submitted = false;
  isLoading = false;
  opcoesContato: Array<Contato['contato']> = ['TELEFONE', 'E-MAIL'];

  contatoForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    sobrenome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    contato: new FormControl<Contato['contato']>('' as Contato['contato'], Validators.required),
    receberPropagandas: new FormControl(false),
    aceitouLGPD: new FormControl(false, Validators.requiredTrue) // Validação requer que seja true
  });

  onSubmit() {
    this.submitted = true;
    if (this.contatoForm.valid) {
      this.isLoading = true;
      this.formSubmit.emit(this.contatoForm.value as Contato);
      this.isLoading = false;
    }
  }
}