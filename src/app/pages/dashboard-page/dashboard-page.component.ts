import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from "../../services/config.service";
import { Router } from '@angular/router';
import { QuestionService } from "../../services/question.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  providers:  [ QuestionService ]
})
export class DashboardPageComponent implements OnInit {
 
  questions: any[];

  constructor(private api: ApiService, private config: ConfigService, private router: Router, service: QuestionService) { 
    this.questions = service.getQuestions();
  }

  ngOnInit() {
    
  }

  goToBegin() {
    let nextPage = this.config.getNextPage(true);
    this.router.navigateByUrl(nextPage);
  }
}
