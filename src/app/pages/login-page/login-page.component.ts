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

  eventId = 'peter@klaven';
  password = 'cityslicka';

  constructor(private api: ApiService, private customer: CustomerService, private router: Router) { }

  ngOnInit() {
    document.body.style.backgroundColor = "#222";
  }

  tryLogin() {
    this.api.login(
      this.eventId,
      this.password
    )
      .subscribe(
        r => {
          if (r.token) {
            this.customer.setToken(r.token);
            this.router.navigateByUrl('/dashboard');
          }
        },
        r => {
          alert(r.error.error);
        });
  }
}