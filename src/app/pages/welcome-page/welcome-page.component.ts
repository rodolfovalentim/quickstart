import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ElementRef} from '@angular/core';

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