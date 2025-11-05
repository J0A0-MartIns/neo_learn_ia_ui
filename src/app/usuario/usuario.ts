import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.scss']
})
export class Usuario implements OnInit {

  usuarioForm!: FormGroup;
  mensagemSucesso = '';
  mensagemErro = '';

  //Por hora será mock
  usuarioMock = {
    nome: 'Marcos Martins',
    email: 'marcos@email.com',
    telefone: '(62) 9 9999-8888',
    cargo: 'Aluno',
    instituicao: 'UEG '
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nome: [this.usuarioMock.nome, [Validators.required]],
      email: [{ value: this.usuarioMock.email, disabled: true }],
      telefone: [this.usuarioMock.telefone],
      cargo: [this.usuarioMock.cargo],
      instituicao: [this.usuarioMock.instituicao]
    });
  }

  salvar(){
    if(this.usuarioForm.invalid){
      this.mensagemErro = "Preencha os campos obrigatórios";
      return;
    }

    this.usuarioMock = {
      ...this.usuarioMock,
      ...this.usuarioForm.getRawValue()
    };

    this.mensagemErro = "";
    this.mensagemSucesso = "Dados atualizados com sucesso!";
    
    setTimeout(() => this.mensagemSucesso = "", 3000);
  }
}
