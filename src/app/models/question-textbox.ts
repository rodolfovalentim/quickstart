import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
  type: string;
  icon: string[];

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.icon = options['icon'] || ["fa", "circle"];
  }
}