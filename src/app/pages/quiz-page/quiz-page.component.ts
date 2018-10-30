import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from "../../services/config.service";

import { QuestionService } from "../../services/question.service";
import { AnswerService } from "../../services/answer.service";
import { Subscription } from 'rxjs';
import { QuestionControlService } from '../../services/question-control.service';

import { PageBaseComponent } from '../../components/page-base/page-base.component'
import { TextModel } from '../../models/text-model';
import { ButtonModel } from '../../models/button-model';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../../models/question-base';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

library.add(fas, far);

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
  providers: [QuestionService, QuestionControlService, AnswerService]
})
export class QuizPageComponent extends PageBaseComponent {

  all_questions: any[];
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
  minScore: number;

  form: FormGroup;
  keyboardLayout = 'Portuguese (Brazil)';
  formResult: any;

  currentQ = 0
  correctAnswers: Map<any, any>
  userResult: number
  msgType = 'welcome'
  stateMachine = 'welcome'

  constructor(
    private api: ApiService,
    private config: ConfigService,
    private router: Router,
    private questionService: QuestionService,
    private qcs: QuestionControlService,
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

    this.all_questions = questionService.getQuestions(this.pageInfo.questions)

    if (this.pageInfo.shuffle) {
      this.questions = this.shuffle(this.all_questions.slice(0, this.pageInfo.numPresentedQuestions))
    } else {
      this.questions = this.all_questions.slice(0, this.pageInfo.numPresentedQuestions)
    }

    this.skipEnable = this.pageInfo.skipEnable
    this.minScore = this.pageInfo.minScore
    this.answers = []

    this.subscription = answerService.answersAnnounce$.subscribe(
      answer => {
        this.answers.push(answer);
        router.navigateByUrl(this.next);
      });
  }

  ngOnInit() {
    console.log("Initialize Quiz Page")
    this.form = this.qcs.toFormGroup(this.questions)
    this.correctAnswers = this.createMapOfAnswers(this.questions)
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe()
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  onSubmit() {
    console.log("Form", this.form)
    let user_answers = JSON.stringify(this.form.value)
    console.log("Respostas do Usuário", user_answers)
    this.verifyAnswers(user_answers)
    console.log("Respostas Corretas", this.correctAnswers)
    this.userResult = this.verifyAnswers(user_answers)

    if (this.userResult >= this.pageInfo.minScore) {
      this.msgType = "success"
    } else {
      this.msgType = "failure"
    }

    this.stateMachine = 'end'
  }

  onComplete() {
    console.log("Form", this.form)
  }

  nextQuestion() {
    this.currentQ += 1
  }

  createMapOfAnswers(questions) {
    let map = new Map();
    for (let question of questions) {
      map.set(String(question['key']), Number(question['answer']));
    }
    return map
  }

  verifyAnswers(user_answers) {
    let corrects = 0
    let jsonStr = JSON.parse(user_answers)

    let obj = Object.create(jsonStr);
    console.log("Obj", obj)
    console.log("Corrected", this.correctAnswers)

    for (let prop in obj) {
      // console.log("Aqui", prop, obj[prop], this.correctAnswers.get(prop))
      if (obj[prop] == this.correctAnswers.get(prop))
        corrects += 1
    }
    return corrects
  }

  start() {
    this.stateMachine = 'quiz'
  }

  finish() {
    let user_answers = JSON.stringify(this.form.value)
    this.answerService.announceAnswer(user_answers)
  }

  tryAgain() {
    this.currentQ = 0
    this.stateMachine = 'welcome'
    this.msgType = 'welcome'
  }

}
