import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params['codigo'];

    if (codigo) {
      this.carregarPessoa(codigo);
    } else {
      this.title.setTitle('AlgaMoney - Cadastrar nova Pessoa');
    }
  }

  salvar(form: FormControl) {
    if (this.pessoa.codigo) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  carregarPessoa(codigo: number) {
    this.pessoasService.buscarPorCodigo(codigo)
      .then(response => {
        this.pessoa = response;
        this.title.setTitle(`AlgaMoney - Editar ${this.pessoa.nome}`);
      })
      .catch(error => this.errorHandlerService.handler(error));
  }

  adicionarPessoa(form: FormControl) {
    this.pessoasService.adicionarPessoas(this.pessoa)
      .then(response => {
        this.showSuccess('Pessoa adicionada com sucesso');
        // form.reset();
        // this.pessoa = new Pessoa();
        this.router.navigate(['/pessoas', response.codigo]);
      })
      .catch(error => this.errorHandlerService.handler(error));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoasService.atualizarPessoa(this.pessoa)
      .then(response => {
        this.showSuccess('Pessoa atualizada com sucesso');
        this.router.navigate(['/pessoas', response.codigo]);
      })
      .catch(error => this.errorHandlerService.handler(error));
  }

  showSuccess(msg: string) {
    this.messageService.add({severity: 'success', summary: '', detail: msg});
  }
}
