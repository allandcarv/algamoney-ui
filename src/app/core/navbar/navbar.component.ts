import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ErrorHandlerService } from './../error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(
    public authService: AuthService,
    private logoutService: LogoutService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService

    ) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout()
      .then(() => this.router.navigate(['/login']))
      .catch(error => this.errorHandlerService.handler(error));
  }

}
