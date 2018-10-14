import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from "../../services/config.service";
import { Router } from '@angular/router';
import { QuestionService } from "../../services/question.service";
import { AnswerService } from "../../services/answer.service";
import { Subscription } from 'rxjs';
import { PageBaseComponent } from '../../components/page-base/page-base.component'
import { TextModel } from '../../models/text-model';
import { ButtonModel } from '../../models/button-model';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far);

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
  providers: [QuestionService]
})
export class QuizPageComponent extends PageBaseComponent {

  questions: any[];
  answers: any[];
  subscription: Subscription;
  skipEnable: boolean

  title: TextModel
  welcomeTitle: TextModel
  welcomeText: TextModel
  successTitle: TextModel
  successMessage: TextModel
  failureTitle: TextModel
  failureMessage: TextModel
  startButton: ButtonModel
  nextButton: ButtonModel
  finishButton: ButtonModel
  tryAgainButton: ButtonModel


  answerTextColor: string;
  answerBoxColor: string;
  answerSelectedBoxColor: string;
  containerColor: string;

  counter: number;

  mode = "stepper";

  constructor(
    private api: ApiService,
    private config: ConfigService,
    private router: Router,
    private questionService: QuestionService,
    private answerService: AnswerService) {

    super("quiz", config);

    this.title = new TextModel(this.pageInfo.title)
    this.welcomeTitle = new TextModel(this.pageInfo.welcomeTitle)
    this.welcomeText = new TextModel(this.pageInfo.welcomeText)
    this.successTitle = new TextModel(this.pageInfo.successTitle)
    this.successMessage = new TextModel(this.pageInfo.successMessage)
    this.failureTitle = new TextModel(this.pageInfo.failureTitle)
    this.failureMessage = new TextModel(this.pageInfo.failureMessage)

    this.startButton = new ButtonModel(this.pageInfo.startButton)
    this.nextButton = new ButtonModel(this.pageInfo.nextButton)
    this.finishButton = new ButtonModel(this.pageInfo.finishButton)
    this.tryAgainButton = new ButtonModel(this.pageInfo.tryAgainButton)

    this.questions = questionService.getQuestions(this.pageInfo.questions)
    this.skipEnable = this.pageInfo.skipEnable
    this.answers = []

    this.subscription = answerService.answersAnnounce$.subscribe(
      answer => {
        this.answers.push(answer);
        router.navigateByUrl(this.next);
      });
  }

  ngOnInit() {
    console.log("Initialize Quiz Page")
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe()
  }

}
