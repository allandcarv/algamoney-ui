import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pessoa } from '../core/models/pessoa.model';

interface HttpResults {
  content: any;
  totalElements: number;
  numberOfElements: number;
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

  httpHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  pesquisar(filtro: PessoasFiltro): Promise<any> {
    let params: HttpParams = new HttpParams();

    params = params.set('page', filtro.page.toString());
    params = params.set('size', filtro.size.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
      params = params.set('page', '0');
    }

    return this.http.get<HttpResults>(this.pessoasUrl, { params }).toPromise().then(response => {
      const resposta = {
        content: response.content,
        totalElements: response.totalElements,
        numberOfElements: response.numberOfElements
      };
      return resposta;
    });
  }

  listarPessoas(): Promise<any> {
    return this.http.get<HttpResults>(this.pessoasUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  atualizarStatus(rowdata: any): Promise<any> {
    (rowdata.ativo) ? rowdata.ativo = false : rowdata.ativo = true;

    return this.http.put(`${this.pessoasUrl}/${rowdata.codigo}/ativo`, rowdata.ativo, { headers: this.httpHeaders })
      .toPromise()
      .then( () => rowdata );
  }

  mostraStatus(status: any) {
    this.status = status;
  }

  adicionarPessoas(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoasUrl, JSON.stringify(pessoa), { headers: this.httpHeaders })
      .toPromise()
      .then(response => response);
  }

  atualizarPessoa(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa), { headers: this.httpHeaders })
      .toPromise()
      .then(response => response);
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => response);
  }
}
