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

  constructor(private router : Router) { 
    document.body.style.backgroundColor = this.bgColor;
  }

  goToNext(){
    console.log(this.apiServer)
    this.router.navigate(['jackpot'])
  }

  ngOnInit() {
    console.log("Initialize Welcome Page")
  }
}