import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from "../../services/config.service";
import { Router } from '@angular/router';
import { QuestionService } from "../../services/question.service";
import { AnswerService } from "../../services/answer.service";
import { Subscription }   from 'rxjs';
import { PageBaseComponent } from '../../components/page-base/page-base.component' 
import { TextModel } from '../../models/text-model';
import { ButtonModel } from '../../models/button-model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  providers:  [ QuestionService ]  
})
export class RegisterPageComponent extends PageBaseComponent implements OnInit {

  mode = "stack"
  title: TextModel
  btnSubmit: ButtonModel
  btnSkip: ButtonModel
  
  questions: any[]
  skipEnable: boolean
  answers: string
  subscription: Subscription

  constructor(
    private api: ApiService, 
    private config: ConfigService, 
    private router: Router,
    private questionService: QuestionService,
    private answerService: AnswerService) {
      
    super("register", config);

    this.title = new TextModel(this.pageInfo.title);
    this.btnSubmit = new ButtonModel(this.pageInfo.submitButton)
    this.btnSkip = new ButtonModel(this.pageInfo.skipButton)

    this.questions = questionService.getQuestions(this.pageInfo.questions)
    this.next = this.pageInfo.next
    this.skipEnable = this.pageInfo.skipEnable

    this.subscription = answerService.answersAnnounce$.subscribe(
      answer => { 
        this.answers = answer
        // api.sendAnswer(this.answers)
        router.navigateByUrl(this.next)
      });
  }

  ngOnInit() {
    console.log("Initialize Register Page")
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe()
  }
}
