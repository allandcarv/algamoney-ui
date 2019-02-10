import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputMaskModule } from 'primeng/InputMask';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { SharedModule } from './../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.modules';

@NgModule({
  declarations: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent,
    PessoasGridComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,

    SharedModule,
    PessoasRoutingModule
  ],
  providers: []
})

export class PessoasModule { }
