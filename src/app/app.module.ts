import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { MessageService } from 'primeng/components/common/api';
import { ToastModule } from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app-routing.module';

registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    ToastModule,
    ConfirmDialogModule,

    SegurancaModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
