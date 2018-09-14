import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from "../../services/config.service";
import { Router } from '@angular/router';
import { QuestionService } from "../../services/question.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  providers:  [ QuestionService ]  
})
export class RegisterPageComponent implements OnInit {

  questions: any[];
  title = "Cadastre suas informações:";

  constructor(private api: ApiService, private config: ConfigService, private router: Router, service: QuestionService) { 
    this.questions = service.getQuestions();
    document.body.style.backgroundColor = "#222";
  }

  ngOnInit() {
    console.log("Initialize Welcome Page");
  }

  cancel() {

  }
  
  register() {

  }

  jump() {

  }
}
