import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { PessoasService } from './../pessoas/pessoas.service';
import { LancamentosService } from './../lancamentos/lancamentos.service';
import { CategoriasService } from './../categorias/categorias.service';
import { AuthService } from './../seguranca/auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';


@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    ErrorHandlerService,
    PessoasService,
    LancamentosService,
    CategoriasService,
    AuthService
  ]
})
export class CoreModule { }
