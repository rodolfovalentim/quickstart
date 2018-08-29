import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(private router : Router) { }

  goToQuiz(){
    this.router.navigate(['quiz'])
  }

  goToCamera(){
    this.router.navigate(['camera'])
  }

  ngOnInit() {
  }

}