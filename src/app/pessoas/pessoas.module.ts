import { InputMaskModule } from 'primeng/InputMask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent,
    PessoasGridComponent
  ],
  exports: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule
  ]
})
export class PessoasModule { }
