import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { ApiService} from '../../services/api.service';
import { CustomerService } from '../../services/customer.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  email = 'peter@klaven';
  password = 'cityslicka';

  constructor(private api: ApiService, private customer: CustomerService, private router: Router) { }

  ngOnInit() {
  }

  tryLogin() {
    this.api.login(
      this.email,
      this.password
    )
      .subscribe(
        r => {
          if (r.token) {
            this.customer.setToken(r.token);
            this.router.navigateByUrl('/welcome');
          }
        },
        r => {
          alert(r.error.error);
        });
  }
}