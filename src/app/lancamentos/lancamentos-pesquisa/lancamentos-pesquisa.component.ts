import { Component, OnInit } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';

import { LancamentosService, LancamentoFiltro } from './../lancamentos.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro: LancamentoFiltro = new LancamentoFiltro();
  lancamentos = [];

  constructor(private lancamentosService: LancamentosService) { }

  ngOnInit() {
    this.filtro.page = 0;
  }

  consultar() {
    this.lancamentosService.consultar(this.filtro).then(resposta => {
      this.totalRegistros = resposta.total;
      this.lancamentos = resposta.lancamentos;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.filtro.page = event.first / event.rows;
    this.consultar();
  }
}
