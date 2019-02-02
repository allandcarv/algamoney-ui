import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  categoriasUrl = 'http://localhost:8080/categorias';
  headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

  constructor( private http: HttpClient ) { }

  listarCategorias(): Promise<any> {
    return this.http.get(this.categoriasUrl, { headers: this.headers })
      .toPromise()
      .then( response => response );
  }
}
