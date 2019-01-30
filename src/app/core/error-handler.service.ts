import { MessageService } from 'primeng/components/common/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handler(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente';
      console.log(errorResponse);
    }

    this.showError(msg);
  }

  private showError(msg: string) {
    this.messageService.add({severity: 'error', summary: '', detail: msg});
  }
}
