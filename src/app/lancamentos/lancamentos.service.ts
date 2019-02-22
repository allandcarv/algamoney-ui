import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
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

  lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }

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

    return this.http.get<HttpResults>(`${this.lancamentosUrl}?resumo`, { params })
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

  return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.post<Lancamento>(this.lancamentosUrl, JSON.stringify(lancamento))
      .toPromise()
      .then(response => response);
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        const lancamentos = response;
        this.converterStringsParaDatas([lancamentos]);
        return lancamentos;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {

    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
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
