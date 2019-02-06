import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { Lancamento } from '../core/models/lancamento.model';

interface HttpResults {
  content: any;
  totalElements: number;
  numberOfElements: number;
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

  constructor(private http: HttpClient) { }

  consultar(filtro: LancamentoFiltro): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
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

    return this.http.get<HttpResults>(`${this.lancamentosUrl}?resumo`, { headers, params })
      .toPromise()
      .then(response => {
        const resposta = {
          lancamentos: response.content,
          total: response.totalElements,
          numberOfElements: response.numberOfElements
        };
        return resposta;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
    .toPromise()
    .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    let headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(this.lancamentosUrl, JSON.stringify(lancamento), { headers } )
      .toPromise()
      .then(response => response);
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => {
        const lancamentos = response;
        this.converterStringsParaDatas([lancamentos]);
        return lancamentos;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const lancamentos = response;
        this.converterStringsParaDatas([lancamentos]);
        return lancamentos;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    lancamentos.forEach(lancamento => {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    });
  }
}
