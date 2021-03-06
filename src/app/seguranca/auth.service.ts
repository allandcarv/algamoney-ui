import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface TokenResponse {
  access_token: string;
}

export class NotAuthError {}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;

  jwtHelper = new JwtHelperService();
  jwtPayload: any;

  constructor(private http: HttpClient) {
    this.carregarToken();
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
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
          if (this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
            console.log('Refresh token expirado');
            throw new NotAuthError();
          }
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

  limparToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
  }

  hasPermission(permission: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permission);
  }

  checkPermission(roles: any): boolean {
    for (const role of roles) {
      return this.hasPermission(role);
    }
  }
}
