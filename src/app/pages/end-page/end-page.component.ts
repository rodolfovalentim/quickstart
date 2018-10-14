import { Component, OnInit } from '@angular/core';
import { PageBaseComponent } from '../../components/page-base/page-base.component' 
import { ConfigService } from "../../services/config.service";
import { Router } from '@angular/router';
import { TextModel } from '../../models/text-model';
import { ButtonModel } from '../../models/button-model';

@Component({
  selector: 'app-end-page',
  templateUrl: './end-page.component.html',
  styleUrls: ['./end-page.component.scss']
})
export class EndPageComponent extends PageBaseComponent implements OnInit {

  title: TextModel
  text: TextModel
  button: ButtonModel

  constructor(
    private config: ConfigService, 
    private router: Router) {

    super("end", config);

    console.log(this.pageInfo)

    this.title = new TextModel(this.pageInfo.title)
    this.text = new TextModel(this.pageInfo.text)
    this.button = new ButtonModel(this.pageInfo.button)  
  }

  goToNext(){
    this.router.navigateByUrl(this.next);
  }

  ngOnInit(){
    console.log("Initialize End Page")
  }
  
}

