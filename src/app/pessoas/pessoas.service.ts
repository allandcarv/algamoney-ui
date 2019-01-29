import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

  constructor(private http: HttpClient) {}

  pesquisar(filtro: PessoasFiltro): Promise<any> {
    let params: HttpParams = new HttpParams();

    params = params.set('page', filtro.page.toString());
    params = params.set('size', filtro.size.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
      params = params.set('page', '0');
    }

    return this.http.get<HttpResults>(this.pessoasUrl, { headers: this.headers, params }).toPromise().then(response => {
      const resposta = {
        content: response.content,
        totalElements: response.totalElements
      };
      return resposta;
    });
  }

  listarTodos(): Promise<any> {
    return this.http.get<HttpResults>(this.pessoasUrl, { headers: this.headers }).toPromise().then(response => response.content);
  }

}
