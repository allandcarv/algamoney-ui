import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MessageService } from 'primeng/components/common/api';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
