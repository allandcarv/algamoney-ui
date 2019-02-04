import { HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { LancamentosService } from './../lancamentos.service';
import { CategoriasService } from './../../categorias/categorias.service';
import { PessoasService } from './../../pessoas/pessoas.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/components/common/api';
import { Lancamento } from './../../core/models/lancamento.model';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  lancamento = new Lancamento();

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];
  categorias = [];
  pessoas = [];

  constructor(
    private lancamentosService: LancamentosService,
    private categoriasService: CategoriasService,
    private pessoasService: PessoasService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
    ) { }

  ngOnInit() {
    this.listarCategorias();
    this.listarPessoas();
  }

  adicionar(form: FormControl) {
    this.lancamentosService.adicionar(this.lancamento)
      .then(() => {
        this.showSuccess('Lançamento adicionado com sucesso');
        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch(error => this.errorHandlerService.handler(error));
  }

  listarCategorias() {
    this.categoriasService.listarCategorias()
      .then(response => {
        this.categorias = response.map( x => ({ label: x.nome , value: x.codigo }));
      })
      .catch(error => this.errorHandlerService.handler(error) );
  }

  listarPessoas() {
    this.pessoasService.listarPessoas()
      .then(response => {
        this.pessoas = response.map(x => ({ label: x.nome, value: x.codigo }));
      });
  }

  showSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: '', detail: msg});
  }
}
