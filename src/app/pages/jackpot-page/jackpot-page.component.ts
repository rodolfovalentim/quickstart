import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { ConfigService } from '../../services/config.service';
import { PageBaseComponent } from '../../components/page-base/page-base.component'
import { ButtonModel } from 'src/app/models/button-model';
import { TextModel } from 'src/app/models/text-model';
import { Slot } from '../../models/app-config'
import { range } from 'rxjs';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-jackpot-page',
  templateUrl: './jackpot-page.component.html',
  styleUrls: ['./jackpot-page.component.scss'],
  animations: [
    trigger('heroState1', [
      state('inactive', style({ transform: 'translateY(0)' })),
      state('active', style({ transform: 'translateY(0)' })),
      transition('* => *', [
        animate("1000ms ease-in-out", keyframes([
          style({ transform: 'translateY(-30em)' }),
          style({ transform: 'translateY(0)' })
        ]))
      ])
    ]),
    trigger('heroState2', [
      state('inactive', style({ transform: 'translateY(0)' })),
      state('active', style({ transform: 'translateY(0)' })),
      transition('* => *', [
        animate("1000ms ease-in-out", keyframes([
          style({ transform: 'translateY(-30em)' }),
          style({ transform: 'translateY(0)' })
        ]))
      ])
    ]),
    trigger('heroState3', [
      state('inactive', style({ transform: 'translateY(0)' })),
      state('active', style({ transform: 'translateY(0)' })),
      transition('* => *', [
        animate("1000ms ease-in-out", keyframes([
          style({ transform: 'translateY(-30em)' }),
          style({ transform: 'translateY(0)' })
        ]))
      ])
    ])
  ]
})
export class JackpotPageComponent extends PageBaseComponent implements OnInit {

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>()

  finishButton: ButtonModel
  spinButton: ButtonModel
  tryAgainButton: ButtonModel
  winText: TextModel
  loseText: TextModel
  winTitle: TextModel
  loseTitle: TextModel

  slots: Slot[]

  weights: number[] = []
  prizes: string[] = []
  images: string[] = []

  slot1: string[] = []
  slot2: string[] = []
  slot3: string[] = []
  sortedImages: string[] = []

  state: string
  state1: string
  state2: string
  state3: string

  prizeIdx: number
  countdown: number

  constructor(
    private config: ConfigService,
    private router: Router
  ) {
    super("jackpot", config);

    this.finishButton = new ButtonModel(this.pageInfo.finishButton)
    this.spinButton = new ButtonModel(this.pageInfo.spinButton)
    this.tryAgainButton = new ButtonModel(this.pageInfo.tryAgainButton)
    this.winText = new TextModel(this.pageInfo.winText)
    this.loseText = new TextModel(this.pageInfo.loseText)
    this.winTitle = new TextModel(this.pageInfo.winTitle)
    this.loseTitle = new TextModel(this.pageInfo.loseTitle)

    let lose = 1

    for (let prize of this.pageInfo.slots) {
      lose -= prize.probability
      this.weights.push(prize.probability)
      this.prizes.push(prize.prize)
      this.images.push(prize.imagePath)
    }

    this.weights.push(lose)
    this.prizes.push("PERDEU")

    for (let i = 0; i < 15; i++) {
      this.sortedImages.push(this.images[i % this.images.length])
    }

    this.slot1 = this.sortedImages.slice(0)
    this.slot2 = this.sortedImages.slice(0)
    this.slot3 = this.sortedImages.slice(0)

    this.state1 = 'active';
    this.state2 = 'active';
    this.state3 = 'active';

    this.sort()

    this.trigger.subscribe(
      x => this.finish(),
      err => console.error('Observer got an error: ' + err),
      () => console.log('Observer got a complete notification')
    );

  }

  ngOnInit() {
    console.log("Initialize Jackpot Page")
  }

  toggleState() {
    this.sort()
    this.state1 = this.state1 === 'active' ? 'inactive' : 'active'
    this.state2 = this.state2 === 'active' ? 'inactive' : 'active'
    this.state3 = this.state3 === 'active' ? 'inactive' : 'active'

    this.triggerSnapshot()
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  sort() {
    this.prizeIdx = this.getRandom(this.weights, this.prizes)

    let result = []

    if (this.prizes[this.prizeIdx] == "PERDEU") {
      result = this.images.slice(0, 3)
    }
    else {
      result = [this.images[this.prizeIdx], this.images[this.prizeIdx], this.images[this.prizeIdx]]
    }

    this.slot1.shift()
    this.slot2.shift()
    this.slot3.shift()

    this.slot1.unshift(result[0])
    this.slot2.unshift(result[1])
    this.slot3.unshift(result[2])
  }

  getRandom(weights, values) {
    let num = Math.random(),
      s = 0,
      lastIndex = weights.length - 1;

    for (var i = 0; i < lastIndex; ++i) {
      s += weights[i];
      if (num < s) {
        return i;
      }
    }
    return lastIndex;
  };

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  public triggerSnapshot(): void {
    this.countdown = 3;
    this.decrementCountdown()
  }

  decrementCountdown() {
    setTimeout(() => {
      this.countdown = this.countdown - 1
      if (this.countdown > 0)
        this.decrementCountdown()
      else {
        setTimeout(() => {
          this.countdown = 4
          this.trigger.next();
        }, 300);
      }
    }, 1000);
  }

  finish() {
    this.state = "end"
  }

  tryAgain() {
    this.state = "spin"
  }

  toNext() {
    this.router.navigateByUrl(this.next);
  }
}
