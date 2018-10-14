import { Component, Input, Output, OnInit, EventEmitter }  from '@angular/core';
import { FormGroup } from '@angular/forms';
 
import { QuestionBase } from '../../models/question-base';
import { QuestionControlService } from '../../services/question-control.service';
import { AnswerService } from "../../services/answer.service";

import { ButtonModel } from '../../models/button-model';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  
  @Input() btnSubmit?: ButtonModel;
  @Input() btnSkip?: ButtonModel;
  @Input() skipEnable? = true;

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