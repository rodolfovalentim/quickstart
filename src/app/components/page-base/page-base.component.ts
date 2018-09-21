import { Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ConfigService } from "../../services/config.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-base',
  template: '',
  styles: [],
  providers:  [ ConfigService ]  
})
export class PageBaseComponent implements OnInit {

  pageInfo: any;
  title: any;
  titleStyle: any;
  next: any;

  constructor(type: string, config: ConfigService) {
    this.pageInfo = config.getPageInfo(type)

    document.body.style.backgroundColor = this.pageInfo.backgroundColor || "#222";
    document.body.style.backgroundImage = this.pageInfo.backgroundPath || "";

    this.title = this.pageInfo.title.text || "Page title";
    this.titleStyle = {
      'color': this.pageInfo.title.color || "#000",
      'font-family': this.pageInfo.title.fontName || "serif",
    }

    this.next = this.pageInfo.next;
  }

  ngOnInit() {
  }

}
