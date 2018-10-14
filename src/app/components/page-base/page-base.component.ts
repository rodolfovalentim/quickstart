import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ConfigService } from "../../services/config.service";
import { Router } from '@angular/router';
import { TextModel } from "../../models/text-model"
import { ButtonModel } from "../../models/button-model"
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far);

@Component({
  selector: 'app-page-base',
  template: '',
  styles: [],
  providers: [ConfigService]
})
export class PageBaseComponent implements OnInit {

  pageInfo: any;
  next: any;
  innerWidth: number;
  innerHeight: number;

  constructor(type: string, config: ConfigService) {
    this.pageInfo = config.getPageInfo(type)
    this.getPageStyle()
    this.next = this.pageInfo.next
    this.innerWidth = window.innerWidth
    this.innerHeight = window.innerHeight
  }

  getPageStyle() {
    document.body.style.backgroundColor = this.pageInfo.backgroundColor || "#222";
    document.body.style.backgroundImage = "url(" + this.pageInfo.backgroundPath + ")" || "url(assets/images/background.png)";
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundRepeat = "no-repeat"
  }

  ngOnInit() {
  }
}
