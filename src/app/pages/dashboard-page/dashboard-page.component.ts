import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { Page } from "../../models/Page.model";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  pages: Page[];
  
  constructor(private api: ApiService) { }

  ngOnInit() {
    console.log("Oi");
  }
}
