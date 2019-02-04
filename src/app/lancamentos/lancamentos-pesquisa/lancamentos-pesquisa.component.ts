import { ConfirmationService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService } from 'primeng/components/common/api';

import { LancamentosService, LancamentoFiltro } from './../lancamentos.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro: LancamentoFiltro = new LancamentoFiltro();
  lancamentos = [];
  totalElements = 0;
  @ViewChild('lancamentosTable') lancamentosTable;

  constructor(
    private lancamentosService: LancamentosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private errorHandlerService: ErrorHandlerService
    ) { }

  ngOnInit() {}

  consultar(page = 0): Promise<any> {
    this.filtro.page = page;

    if (this.filtro.page === 0) {
      this.lancamentosTable.first = 0;
    }

    return this.lancamentosService
      .consultar(this.filtro)
      .then(resposta => {
        this.totalElements = resposta.total;
        this.lancamentos = resposta.lancamentos;
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
        this.consultar(this.filtro.page);
        this.showSuccess();
      })
      .catch(error => this.errorHandlerService.handler(error));
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: '', detail: 'Lançamento excluído com sucesso'});
  }
}
