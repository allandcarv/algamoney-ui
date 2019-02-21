import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { JwtModule } from '@auth0/angular-jwt';

import { AuthGuard } from './auth.guard';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing-module';
import { AuthInterceptService } from './auth-intercept.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [ LoginFormComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        blacklistedRoutes: [/localhost:8080\/oauth\/token/],
        whitelistedDomains: ['localhost:8080']
      }
    }),

    SegurancaRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptService,
      multi: true
    },
    AuthGuard
  ]
})
export class SegurancaModule { }
