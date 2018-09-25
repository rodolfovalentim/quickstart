import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from "../../services/config.service";
import { Router } from '@angular/router';
import { QuestionService } from "../../services/question.service";
import { AnswerService } from "../../services/answer.service";
import { Subscription }   from 'rxjs';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { inherits } from 'util';
 
library.add(fas, far);

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  providers:  [ QuestionService ]  
})
export class RegisterPageComponent implements OnInit {

  mode = "stack";
  questions: any[];

  iconBtnSubmit: string[];
  textBtnSubmit: string;
  textSubmitStyle: {};
  btnSubmitStyle: {};

  skipEnable: boolean;
  iconBtnSkip: string[];
  textBtnSkip: string;
  textSkipStyle: {};
  btnSkipStyle: {};

  answers: string;

  pageInfo = null;
  title = null;
  titleStyle = {};
  next: string = "";
  subscription: Subscription;

  constructor(
    private api: ApiService, 
    private config: ConfigService, 
    private router: Router,
    private questionService: QuestionService,
    private answerService: AnswerService) {
    
    this.pageInfo = config.getPageInfo("register")

    document.body.style.backgroundColor = this.pageInfo.backgroundColor || "#222";
    document.body.style.backgroundImage = this.pageInfo.backgroundPath || "";

    this.title = this.pageInfo.title.text || "Cadastre suas informações:";
    this.titleStyle = {
      'color': this.pageInfo.title.color || "#000",
      'font-family': this.pageInfo.title.fontName || "serif"
    }

    this.textBtnSubmit = this.pageInfo.submitButton.text.text || "Registrar";
    this.iconBtnSubmit = this.pageInfo.submitButton.icon.split("-") || ["far", "home"]

    this.btnSubmitStyle = { 
      'background-color': this.pageInfo.submitButton.color || "red",
      'color': this.pageInfo.submitButton.text.color || inherits,
      'font-family': this.pageInfo.submitButton.text.fontName || inherits
    };

    this.textBtnSkip = this.pageInfo.skipButton.text.text || "Pular";
    this.iconBtnSkip = this.pageInfo.skipButton.icon.split("-") || ["far", "home"]

    this.btnSkipStyle = {
      'background-color': this.pageInfo.skipButton.color || "red",
      'color': this.pageInfo.skipButton.text.color || inherits,
      'font-family': this.pageInfo.skipButton.text.fontName || inherits
    }

    this.questions = questionService.getQuestions(this.pageInfo.questions);
    this.next = this.pageInfo.next;
    this.skipEnable = this.pageInfo.skipEnable;
    this.subscription = answerService.answersAnnounce$.subscribe(
      answer => { 
        this.answers = answer;
        router.navigateByUrl(this.next);
      });
  }

  ngOnInit() {
    console.log("Initialize Welcome Page");
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
