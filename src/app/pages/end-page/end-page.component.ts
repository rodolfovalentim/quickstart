import { Component, OnInit } from '@angular/core';
import { PageBaseComponent } from '../../components/page-base/page-base.component' 
import { ConfigService } from "../../services/config.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-end-page',
  templateUrl: './end-page.component.html',
  styleUrls: ['./end-page.component.scss']
})
export class EndPageComponent extends PageBaseComponent {

  btn = "";
  title = "";
  titleStyle = {};
  btnStyle = {};
  nextPage = "";
  icon = null;

  constructor(
    private config: ConfigService, 
    private router: Router) {

    super("end", config);

    this.btn = this.pageInfo.button.text.text || "Click me!";
    this.btnStyle = {
      'background-color': this.pageInfo.button.color || "red",
      'color': this.pageInfo.button.text.color || "#000",
      'font-family': this.pageInfo.button.text.fontName || "serif"
    }
    
    this.title = this.pageInfo.title.text;
    this.titleStyle = {
      'color': this.pageInfo.title.color || "#000",
      'font-family': this.pageInfo.title.fontName || "serif"
    }

    this.icon = this.pageInfo.button.icon.split("-") || ["far", "home"]
    this.nextPage = this.pageInfo.next;
  }

  goToNext(){
    this.router.navigateByUrl(this.nextPage);
  }

  
}

