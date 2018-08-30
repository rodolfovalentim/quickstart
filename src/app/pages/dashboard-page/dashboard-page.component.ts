import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { Page } from "../../models/Page";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  pages: Page[];
  
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getPages();
    console.log("Oi");
  }

  getPages(): void {
    this.api.getPages().subscribe(pages => this.pages = pages);
  }
}
