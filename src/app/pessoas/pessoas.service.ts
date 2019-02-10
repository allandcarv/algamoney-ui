import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pessoa } from '../core/models/pessoa.model';

interface HttpResults {
  content: any;
  totalElements: number;
}

export class PessoasFiltro {
  nome: string;
  page = 0;
  size = 5;
}

@Injectable()
export class PessoasService {
  pessoasUrl = 'http://localhost:8080/pessoas';
  status: any;

  constructor(private http: HttpClient) {}

  pesquisar(filtro: PessoasFiltro): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params: HttpParams = new HttpParams();

    params = params.set('page', filtro.page.toString());
    params = params.set('size', filtro.size.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
      params = params.set('page', '0');
    }

    return this.http.get<HttpResults>(this.pessoasUrl, { headers, params }).toPromise().then(response => {
      const resposta = {
        content: response.content,
        totalElements: response.totalElements
      };
      return resposta;
    });
  }

  listarPessoas(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get<HttpResults>(this.pessoasUrl, { headers }).toPromise().then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers } ).toPromise().then(() => null);
  }

  atualizarStatus(rowdata: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.set('Content-Type', 'application/json');

    (rowdata.ativo) ? rowdata.ativo = false : rowdata.ativo = true;

    return this.http.put(`${this.pessoasUrl}/${rowdata.codigo}/ativo`, rowdata.ativo, { headers })
      .toPromise()
      .then( () => rowdata );
  }

  mostraStatus(status: any) {
    this.status = status;
  }

  adicionarPessoas(pessoa: Pessoa): Promise<Pessoa> {
    let headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post<Pessoa>(this.pessoasUrl, JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response);
  }

  atualizarPessoa(pessoa: Pessoa): Promise<Pessoa> {
    let headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.set('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response);
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`, { headers})
      .toPromise()
      .then(response => response);
  }
}
