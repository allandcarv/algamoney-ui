import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing-module';

@NgModule({
  declarations: [ LoginFormComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,

    SegurancaRoutingModule
  ]
})
export class SegurancaModule { }