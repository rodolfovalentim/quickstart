import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from "../../services/config.service";
import { Router } from '@angular/router';
import { QuestionService } from "../../services/question.service";
import { AnswerService } from "../../services/answer.service";
import { Subscription }   from 'rxjs';
import { PageBaseComponent } from '../../components/page-base/page-base.component'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
 
library.add(fas, far);

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
  providers:  [ QuestionService ]  
})
export class QuizPageComponent extends PageBaseComponent  {

  questions: any[];
  answers: any;
  subscription: Subscription;

  skipEnable: any;
  iconBtnSubmit: any;
  iconBtnSkip: any;
  textBtnSubmit: any;
  textBtnSkip: any;
  btnSubmitStyle: any;
  btnSkipStyle: any;
  
  mode = "stepper";

  constructor(
    private api: ApiService, 
    private config: ConfigService, 
    private router: Router,
    private questionService: QuestionService,
    private answerService: AnswerService) {

    super("quiz", config);

    this.questions = this.questionService.getQuestions(this.pageInfo.questions);
    console.log(this.questions)

    this.skipEnable = false;
    this.iconBtnSubmit = ['fa', 'home'];
    this.iconBtnSkip = ['fa', 'home'];
    this.textBtnSubmit = "Submit"
    this.textBtnSkip = "Submit"
    this.btnSubmitStyle = {}
    this.btnSkipStyle = {}

    this.subscription = answerService.answersAnnounce$.subscribe(
      answer => { 
        this.answers = answer;
        router.navigateByUrl(this.next);
      });
  }

  ngOnInit() {
  }

}
