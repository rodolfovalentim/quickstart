import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../../models/question-base';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})

export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<any>
  @Input() form: FormGroup
  @Input() keyboard: string

  @Input() answerTextColor?: string
  @Input() answerBoxColor?: string
  @Input() answerSelectedTextColor?: string
  @Input() answerSelectedBoxColor?: string

  selectedStyle: {
    'background-color': string,
    'color': string
  }

  idleStyle: {
    'background-color': string,
    'color': string
  }

  constructor() {
    this.selectedStyle = {
      'background-color': this.answerBoxColor || "#aaa",
      'color': this.answerTextColor || "#fff"
    }

    this.idleStyle = {
      'background-color': this.answerSelectedBoxColor || "#fff",
      'color': this.answerSelectedTextColor || "#000"
    }
  }

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  selected(questionKey, optKey) {
    if (this.form.value[questionKey] == optKey) {
      return true
    }
    return false
  }
}
