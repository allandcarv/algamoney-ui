import { Component, OnInit } from '@angular/core';

import { CategoriasService } from './../../categorias/categorias.service';
import { PessoasService } from './../../pessoas/pessoas.service';
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

  pessoas = [];

  constructor(
    private categoriasService: CategoriasService,
    private pessoasService: PessoasService,
    private errorHandlerService: ErrorHandlerService
    ) { }

  ngOnInit() {
    this.listarCategorias();
    this.listarPessoas();
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
}
