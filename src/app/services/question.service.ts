import { Injectable }       from '@angular/core';

import { QuestionBase }     from '../models/question-base';
import { TextboxQuestion }  from '../models/question-textbox';
import { DropdownQuestion } from '../models/question-dropdown';
import { RadioQuestion } from '../models/question-radio';

@Injectable()
export class QuestionService {
  
  getQuestions(json: any[]) {

    let questions: QuestionBase<any>[] = [];
    
    for (let question of json) {
      if (question.question_type == "textbox") {
        questions.push(
          new TextboxQuestion({
            key: question.key,
            label: question.label,
            value: question.type,
            required: true,
            order: question.order
          })
        )
      } else if (question.question_type == "radio") {
        questions.push(
          new RadioQuestion({
            key: question.id,
            label: question.question,
            options: question.options,
            order: 4
          })
        )
      }
    }

  return questions.sort((a, b) => a.order - b.order);
  }
}