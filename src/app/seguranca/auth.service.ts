import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  constructor(private http: HttpClient) { }

  login(user: string, pass: string): Promise<void> {
    const body = `client=angular&username=${user}&password=${pass}&grant_type=password`;
    let headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then(response => console.log(response));

  }
}
