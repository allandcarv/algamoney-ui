import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  logout(): Promise<any> {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => this.authService.limparToken());
  }
}
