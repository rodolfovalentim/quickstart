import { Component, Input, Output, OnInit, EventEmitter }  from '@angular/core';
import { FormGroup } from '@angular/forms';
 
import { QuestionBase } from '../../models/question-base';
import { QuestionControlService } from '../../services/question-control.service';
import { AnswerService } from "../../services/answer.service";

import { ButtonModel } from '../../models/button-model';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-dynamic-quiz',
  templateUrl: './dynamic-quiz.component.html',
  styleUrls: ['./dynamic-quiz.component.scss'],
  providers: [ QuestionControlService ]
})
export class DynamicQuizComponent implements OnInit {

  @Input() mode = "stack";
  @Input() questions: QuestionBase<any>[] = [];
  
  // for stack mode
  @Input() btnSubmit?: ButtonModel;
  @Input() btnSkip?: ButtonModel;
  @Input() skipEnable? = true;

  // for stepper mode
  @Input() backEnable? = true;  
  @Input() backButton?: ButtonModel;
  @Input() nextButton?: ButtonModel;
  @Input() finishButton?: ButtonModel;

  form: FormGroup;
  payLoad = '';
  keyboardLayout = 'Portuguese (Brazil)';
  formResult: any;
  constructor(
    private qcs: QuestionControlService,
    private answer: AnswerService
    ) {}
 
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions)
  }
 
  onSubmit() {
    console.log("Form", this.form)
    let answer = JSON.stringify(this.form.value)
    console.log("Respostas", answer)
    this.answer.announceAnswer(answer)
  }

  onStepChanged(event){
    if(event.title == 'Question ' + this.questions[this.questions.length - 1].key) {
    this.formResult = 'Parabéns'
    console.log("Testing", event)
    }
  }

  onComplete() {
    console.log("Form", this.form)
  }
}
