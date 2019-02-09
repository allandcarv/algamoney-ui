import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private errorHandlerService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    const codigoLancamento = this.activatedRoute.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.listarCategorias();
    this.listarPessoas();
  }

  carregarLancamento(codigoLancamento: number) {
    this.lancamentosService.buscarPorCodigo(codigoLancamento)
      .then(response => this.lancamento = response)
      .catch(error => this.errorHandlerService.handler(error));
  }

  salvar(form: FormControl) {
    if (this.lancamento.codigo) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento(form);
    }
  }
  adicionarLancamento(form: FormControl) {
    this.lancamentosService.adicionar(this.lancamento)
      .then(response => {
        this.showSuccess('Lançamento adicionado com sucesso');
        this.router.navigate(['/lancamentos', response.codigo]);
      })
      .catch(error => this.errorHandlerService.handler(error));
  }

  atualizarLancamento() {
    this.lancamentosService.atualizar(this.lancamento)
      .then(response => {
        this.lancamento = response;
        this.showSuccess('Lançamento atualizado com sucesso');
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

  novo(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  showSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: '', detail: msg});
  }
}
