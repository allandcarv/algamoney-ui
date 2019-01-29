import { Component, OnInit, ViewChild } from '@angular/core';

import { PessoasService, PessoasFiltro } from './../pessoas.service';
import { LazyLoadEvent } from 'primeng/components/common/api';

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

  constructor(private pessoasService: PessoasService) {
    this.filtro.page = 0;
  }

  ngOnInit() {
  }

  pesquisar(page = 0): Promise<any> {
    this.filtro.page = page;

    if (this.filtro.page === 0) {
      this.pessoasGrid.first = 0;
    }
    return this.pessoasService.pesquisar(this.filtro).then(response => {
      this.pessoas = response.content;
      this.totalElements = response.totalElements;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.pesquisar(page);
  }
}
