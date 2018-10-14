import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../../models/question-base';
import { QuestionControlService } from '../../services/question-control.service';
import { AnswerService } from "../../services/answer.service";
import { NgForm } from '@angular/forms';
import { TextModel } from '../../models/text-model';
import { ButtonModel } from '../../models/button-model';


@Component({
  selector: 'app-dynamic-quiz',
  templateUrl: './dynamic-quiz.component.html',
  styleUrls: ['./dynamic-quiz.component.scss'],
  providers: [QuestionControlService]
})
export class DynamicQuizComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  @Input() minPoints: number

  @Input() backEnable?= true
  @Input() backButton?: ButtonModel
  @Input() answerTextColor?: string
  @Input() answerBoxColor?: string
  @Input() answerSelectedTextColor?: string
  @Input() answerSelectedBoxColor?: string
  @Input() containerColor?: string

  @Input() nextButton: ButtonModel
  @Input() finishButton: ButtonModel
  @Input() title: TextModel
  @Input() welcomeTitle: TextModel
  @Input() welcomeText: TextModel
  @Input() startButton: ButtonModel

  @Input() successTitle: TextModel
  @Input() successMessage: TextModel
  @Input() failureTitle: TextModel
  @Input() failureMessage: TextModel
  @Input() tryAgainButton: ButtonModel

  form: FormGroup;
  keyboardLayout = 'Portuguese (Brazil)';
  formResult: any;

  currentQ = 0
  correctAnswers: Map<any, any>
  userResult: number
  msgType = 'welcome'
  stateMachine = 'welcome'

  constructor(
    private qcs: QuestionControlService,
    private answer: AnswerService
  ) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions)
    this.correctAnswers = this.createMapOfAnswers(this.questions)
  }

  onSubmit() {
    console.log("Form", this.form)
    let user_answers = JSON.stringify(this.form.value)
    console.log("Respostas do Usuário", user_answers)
    this.verifyAnswers(user_answers)
    console.log("Respostas Corretas", this.correctAnswers)
    this.userResult = this.verifyAnswers(user_answers)

    if (this.userResult >= this.minPoints) {
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
    this.answer.announceAnswer(user_answers)
  }

  tryAgain() {
    this.currentQ = 0
    this.stateMachine = 'welcome'
    this.msgType = 'welcome'
  }
}
