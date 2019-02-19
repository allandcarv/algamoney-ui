import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TokenResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  jwtHelper = new JwtHelperService();
  jwtPayload: any;

  constructor(private http: HttpClient) {
    this.carregarToken();
  }

  login(user: string, pass: string): Promise<void> {
    const body = `client=angular&username=${user}&password=${pass}&grant_type=password`;
    let headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<TokenResponse>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => this.armazenarToken(response.access_token))
      .catch(error => {
        if (error.status === 400 && error.error.error === 'invalid_grant') {
          return Promise.reject('Usuário e/ou senha inválido(s)');
        }

        return Promise.reject(error);
      })
      ;

  }

  renewAccessToken(): Promise<void> {
    let headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return this.http.post<TokenResponse>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
        console.log('Novo token armazenado');
        return Promise.resolve(null);
      })
      .catch(error => {
        console.log('Erro ao renovar token', error);
        return Promise.resolve(null);
      });
  }

  refreshToken(): Observable<string> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const params = new HttpParams()
      .set('grant_type', 'refresh_token');

    return this.http.post<TokenResponse>(this.oauthTokenUrl, null, { headers, params, withCredentials: true })
      .pipe(
        map(token => {
          this.armazenarToken(token.access_token);
          return token.access_token;
        })
      );
  }


  armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  hasPermission(permission: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permission);
  }
}
