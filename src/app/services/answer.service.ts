import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private answersAnnounceSource = new Subject<string>();
  answersAnnounce$ = this.answersAnnounceSource.asObservable();

  announceAnswer(answer: string) {
    console.log("Answer", answer);
    this.answersAnnounceSource.next(answer);
  }
}