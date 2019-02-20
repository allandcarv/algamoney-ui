import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent, MessageService } from 'primeng/components/common/api';

import { LancamentosService, LancamentoFiltro } from './../lancamentos.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro: LancamentoFiltro = new LancamentoFiltro();
  lancamentos = [];
  totalElements = 0;
  numberOfElements: number;
  @ViewChild('lancamentosTable') lancamentosTable;

  constructor(
    private lancamentosService: LancamentosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle('AlgaMoney - Pesquisa de Lançamentos');
  }

  consultar(page = 0): Promise<any> {
    this.filtro.page = page;

    this.lancamentosTable.first = this.filtro.page * this.filtro.size;

    return this.lancamentosService
      .consultar(this.filtro)
      .then(resposta => {
        this.totalElements = resposta.total;
        this.lancamentos = resposta.lancamentos;
        this.numberOfElements = resposta.numberOfElements;
      })
      .catch(error => this.errorHandlerService.handler(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.consultar(page);
  }

  confirmarExclusao(rowData: any) {
    this.confirmationService.confirm({
      message: `Você tem certeza que quer excluir o lançamento de código ${rowData.codigo}?`,
      accept: () => {
        this.excluir(rowData);
      }
    });
  }

  excluir(rowData: any) {
    this.lancamentosService.excluir(rowData.codigo)
      .then(() => {
        // const index = this.lancamentos.indexOf(rowData);
        // this.lancamentos.splice(index, 1);
        // this.lancamentos = [...this.lancamentos];
        let page;
        if (this.numberOfElements === 1) {
          page = this.filtro.page - 1;
        } else {
          page = this.filtro.page;
        }
        this.consultar(page);
        this.showSuccess();
      })
      .catch(error => this.errorHandlerService.handler(error));
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: '', detail: 'Lançamento excluído com sucesso'});
  }
}
