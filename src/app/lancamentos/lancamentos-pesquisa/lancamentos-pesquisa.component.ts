import { ConfirmationService } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, MessageService } from 'primeng/components/common/api';

import { LancamentosService, LancamentoFiltro } from './../lancamentos.service';

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
    private confirmationService: ConfirmationService
    ) { }

  ngOnInit() {}

  consultar(page = 0): Promise<any> {
    this.filtro.page = page;

    if (this.filtro.page === 0) {
      this.lancamentosTable.first = 0;
    }

    return this.lancamentosService.consultar(this.filtro).then(resposta => {
      this.totalElements = resposta.total;
      this.lancamentos = resposta.lancamentos;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.consultar(page);
  }

  confirmarExclusao(codigo: number) {
    this.confirmationService.confirm({
      message: `Você tem certeza que quer excluir o lançamento de código ${codigo}?`,
      accept: () => {
        this.excluir(codigo);
      }
    });
  }

  excluir(codigo: number) {
    this.lancamentosService.excluir(codigo).then(() => {
      this.consultar();
      this.lancamentosTable.first = 0;
      this.showSuccess();
    });
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: '', detail: 'Lançamento excluído com sucesso'});
  }
}
