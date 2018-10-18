import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from "../../services/config.service";
import { Router } from '@angular/router';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(private api: ApiService, private config: ConfigService, private router: Router) {
    document.body.style.backgroundColor = "#fff";
    document.body.style.backgroundImage = "";
  }

  ngOnInit() {
    console.log("Initialize Dashboard Page")
  }

  goToBegin() {
    let nextPage = this.config.getFirstPage();
    this.router.navigateByUrl(nextPage);
  }
}
