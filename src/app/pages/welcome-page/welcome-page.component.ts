import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  protected apiServer = ConfigService.name;
  bgColor = "#222";

  constructor(private config: ConfigService, private router : Router) { 
    document.body.style.backgroundColor = this.bgColor;
  }

  goToNext(){
    let nextPage = this.config.getNextPage();
    this.router.navigateByUrl(nextPage);
  }

  ngOnInit() {
    console.log("Initialize Welcome Page")
  }
}