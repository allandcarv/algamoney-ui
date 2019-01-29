import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

interface HttpResults {
  content: any;
  totalElements: number;
}

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  page = 0;
  size = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';
  headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

  constructor(private http: HttpClient) { }

  consultar(filtro: LancamentoFiltro): Promise<any> {
    let params: HttpParams = new HttpParams();

    params = params.set('page', filtro.page.toString());
    params = params.set('size', filtro.size.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get<HttpResults>(`${this.lancamentosUrl}?resumo`, { headers: this.headers, params })
      .toPromise()
      .then(response => {
        const resposta = {
          lancamentos: response.content,
          total: response.totalElements
        };
        return resposta;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers: this.headers })
    .toPromise()
    .then(() => null);
  }
}
