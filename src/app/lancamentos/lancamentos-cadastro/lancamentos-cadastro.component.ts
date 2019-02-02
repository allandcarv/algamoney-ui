import { Component, OnInit } from '@angular/core';

import { CategoriasService } from './../../categorias/categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamentos-cadastro',
  templateUrl: './lancamentos-cadastro.component.html',
  styleUrls: ['./lancamentos-cadastro.component.css']
})
export class LancamentosCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];

  pessoas = [
    { label: 'João da Silva', value: 1 },
    { label: 'Sebastião Souza', value: 2},
    { label: 'Maria Abadia', value: 3 }
  ];

  constructor(
    private categoriasService: CategoriasService,
    private errorHandlerService: ErrorHandlerService
    ) { }

  ngOnInit() {
    this.listarCategorias();
  }

  listarCategorias() {
    this.categoriasService.listarCategorias()
      .then(response => {
        this.categorias = response.map( x => ({ label: x.nome , value: x.codigo }));
      })
      .catch(error => this.errorHandlerService.handler(error) );
  }
}
