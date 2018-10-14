import { Injectable } from '@angular/core';

import { QuestionBase } from '../models/question-base';
import { TextboxQuestion } from '../models/question-textbox';
import { DropdownQuestion } from '../models/question-dropdown';
import { RadioQuestion } from '../models/question-radio';

@Injectable()
export class QuestionService {

  getQuestions(json: any[]) {

    let questions: QuestionBase<any>[] = [];

    for (let question of json) {
      if (question.questionType == "textbox") {
        questions.push(
          new TextboxQuestion({
            key: question.key,
            label: question.label,
            value: question.placeholder || "",
            required: true,
            order: question.order
          })
        )
      }
      else if (question.questionType == "radio") {
        questions.push(
          new RadioQuestion({
            key: question.id,
            label: question.question,
            options: question.options,
            order: 4,
            answer: question.answer,
            questionLabel: question.questionLabel
          })
        )
      }
    }

    return questions.sort((a, b) => a.order - b.order);
  }
}