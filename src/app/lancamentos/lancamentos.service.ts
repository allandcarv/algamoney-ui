import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  consultar(filtro: LancamentoFiltro): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params: HttpParams = new HttpParams();

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.append('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.append('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    console.log(params);

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params })
      .toPromise()
      .then(response => response.content);
  }
}
