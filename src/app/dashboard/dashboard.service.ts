import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentosUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }

  lancamentosPorCategoria(): Promise<any> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then(response => response);
  }

  lancamentosPorDia(): Promise<any> {
    return this.http.get(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then(response => {
        const dados = response;
        this.converterStringParaDatas(dados);
        return dados;
      });
  }

  private converterStringParaDatas(dados: any) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYY-MM-DD').toDate();
    }
  }

}
