import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
 
library.add(fas, far);

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  pageInfo = null;
  btn = "";
  title = "";
  titleStyle = {};
  btnStyle = {};
  nextPage = "";
  icon = null;

  constructor(private config: ConfigService, private router : Router) {
    this.pageInfo = config.getPageInfo("welcome")
    
    document.body.style.backgroundColor = this.pageInfo.backgroundColor || "#222";
    document.body.style.backgroundImage = this.pageInfo.backgroundPath || "";
    
    this.btn = this.pageInfo.button.text.text || "Click me!";
    this.btnStyle = {
      background: this.pageInfo.button.text.text || "red",
      color: this.pageInfo.button.text.color || "#000",
      'font-family': this.pageInfo.button.text.fontName || "serif"
    }
    
    this.title = this.pageInfo.title.text;
    this.titleStyle = {
      color: this.pageInfo.title.color || "#000",
      'font-family': this.pageInfo.title.fontName || "serif"
    }
    console.log
    this.icon = this.pageInfo.button.icon.split("-") || ["far", "home"]
    this.nextPage = this.pageInfo.next;
    console.log("Next:", this.nextPage);
  }

  goToNext(){
    this.router.navigateByUrl(this.nextPage);
  }

  ngOnInit() {
    console.log("Initialize Welcome Page")
  }
}