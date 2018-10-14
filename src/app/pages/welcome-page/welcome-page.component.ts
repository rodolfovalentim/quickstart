import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { PageBaseComponent } from '../../components/page-base/page-base.component' 
import { ButtonModel } from '../../models/button-model';
import { TextModel } from '../../models/text-model';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent extends PageBaseComponent implements OnInit {

  title: TextModel
  btn: ButtonModel
  contentStyle: { 
    'margin-top': string
  }

  constructor(private config: ConfigService, private router : Router) {
    super("welcome", config)  
    this.btn = new ButtonModel(this.pageInfo.button)
    this.title = new TextModel(this.pageInfo.title)
    
    this.contentStyle = { "margin-top":  "700px" }
  }

  goToNext(){
    console.log(this.next)
    this.router.navigateByUrl(this.next);
  }

  ngOnInit() {
    console.log("Initialize Welcome Page")
  }
}