import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-jackpot-page',
  templateUrl: './jackpot-page.component.html',
  styleUrls: ['./jackpot-page.component.scss'],
  animations: [
    trigger('heroState', [
      state('inactive', style({transform: 'translateY(0)'})),
      state('active', style({transform: 'translateY(0)'})),
      transition('* => *', [
        animate("400ms ease-in-out", keyframes([
          style({ transform: 'translateY(-15em)' }),
          style({ transform: 'translateY(0)' })
        ]))
      ])
    ])
  ]
})
export class JackpotPageComponent implements OnInit {

  title = 'quickstart';
  armor = '../../../assets/images/jackpot/jackpot.png'
  images = ['../../../assets/images/jackpot/slot-1.png',
            '../../../assets/images/jackpot/slot-2.png',
            '../../../assets/images/jackpot/slot-3.png']

  state = 'active';

  protected apiServer = ConfigService.settings;

  sortImages = []

  constructor() { }

  ngOnInit() { }
  
  toggleState() {
    this.sort()
    this.state = this.state === 'active' ? 'inactive' : 'active'
    console.log(this.state)
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  sort() {
    let prize = this.getRandomInt(3);
    let jackImages = this.images.concat(this.images, this.images, this.images, this.images);
    jackImages[0] = this.images[prize] 
    this.sortImages = jackImages
  }

}
