import { Component, Input, Output, OnInit, EventEmitter }  from '@angular/core';
import { FormGroup } from '@angular/forms';
 
import { QuestionBase } from '../../models/question-base';
import { QuestionControlService } from '../../services/question-control.service';
import { AnswerService } from "../../services/answer.service";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  
  @Input() iconBtnSubmit: string;
  @Input() iconBtnSkip: string;

  @Input() textBtnSubmit: string;
  @Input() textBtnSkip: string;
  @Input() btnSubmitStyle = {};
  @Input() btnSkipStyle = {};

  @Input() skipEnable = true;

  @Input() mode = "stack";

  form: FormGroup;
  payLoad = '';
  keyboardLayout = 'Portuguese (Brazil)';
  
  constructor(
    private qcs: QuestionControlService,
    private answer: AnswerService
    ) {}
 
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }
 
  onSubmit() {
    let answer = JSON.stringify(this.form.value);
    this.answer.announceAnswer(answer);
  }
}