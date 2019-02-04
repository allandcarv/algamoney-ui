import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { PessoasService } from './../pessoas.service';
import { Pessoa } from './../../core/models/pessoa.model';
import { MessageService } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {
  pessoa = new Pessoa();

  constructor(
    private pessoasService: PessoasService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  adicionarPessoa(form: FormControl) {
    this.pessoasService.adicionarPessoas(this.pessoa)
      .then(() => {
        this.showSuccess('Pessoa adicionada com sucesso');
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(error => this.errorHandlerService.handler(error));
  }

  showSuccess(msg: string) {
    this.messageService.add({severity: 'success', summary: '', detail: msg});
  }
}
