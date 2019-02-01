import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService } from 'primeng/components/common/api';
import { ConfirmationService } from 'primeng/api';

import { PessoasService, PessoasFiltro } from './../pessoas.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  filtro: PessoasFiltro = new PessoasFiltro();
  pessoas = [];
  totalElements = 0;
  @ViewChild('pessoasGrid') pessoasGrid;

  constructor(
    private pessoasService: PessoasService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
    ) {}

  ngOnInit() {
  }

  pesquisar(page = 0): Promise<any> {
    this.filtro.page = page;

    if (this.filtro.page === 0) {
      this.pessoasGrid.first = 0;
    }

    return this.pessoasService.pesquisar(this.filtro)
    .then(response => {
      this.pessoas = response.content;
      this.totalElements = response.totalElements;
    })
    .catch(error => { this.errorHandlerService.handler(error); });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.pesquisar(page);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: `Você deseja mesmo excluir ${pessoa.nome}`,
      accept: () => { this.excluir(pessoa); }
    });
  }

  excluir(pessoa: any) {
    this.pessoasService.excluir(pessoa.codigo)
      .then(() => { this.showSuccess(`${pessoa.nome} foi excluído(a) com sucesso.`); } )
      .catch(error => { this.errorHandlerService.handler(error); });
  }

  atualizarStatus(rowdata: any) {
    this.pessoasService.atualizarStatus(rowdata)
      .then(response => {
        const index = this.pessoas.indexOf(rowdata);
        this.pessoas[index] = response;
        this.showSuccess('Estado atualizado com sucesso');
      })
      .catch(error => { this.errorHandlerService.handler(error); });
  }

  showSuccess(msg: string) {
    this.messageService.add({severity: 'success', summary: '', detail: msg });
  }

  teste(rowdata: any) {
    console.log(rowdata);
    rowdata.ativo = false;
    let index = 0;
    console.log(rowdata);
    index = this.pessoas.indexOf(rowdata);
    this.pessoas[index].ativo = false;
    //this.pessoas = [...this.pessoas];
    console.log(this.pessoas);
  }
}
