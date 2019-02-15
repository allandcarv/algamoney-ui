import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
    ) { }

  ngOnInit() {
  }

  login(user: string, pass: string) {
    this.authService.login(user, pass)
      .then(() => this.router.navigate(['/lancamentos']))
      .catch(error => this.errorHandlerService.handler(error));
  }


}
