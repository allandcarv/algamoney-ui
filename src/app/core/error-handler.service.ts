import { MessageService } from 'primeng/components/common/api';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handler(errorResponse: HttpErrorResponse) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if ( errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499) {
      if (errorResponse.error[0]) {
        msg = errorResponse.error[0].mensagemUsuario;
        console.error('Ocorreu um erro: ', errorResponse.error[0].mensagemDesenvolvedor);
      } else {
        msg = 'Ocorreu um erro em sua solicitação. Tente novamente';
        console.error('Ocorreu um erro: ', errorResponse);
      }
    }

    this.showError(msg);
  }

  private showError(msg: string) {
    this.messageService.add({severity: 'error', summary: '', detail: msg});
  }
}
