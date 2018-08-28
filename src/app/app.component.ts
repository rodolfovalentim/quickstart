import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'quickstart';
  images = ['https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2000px-EBay_logo.svg.png',
            'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2000px-Microsoft_logo_%282012%29.svg.png'];

}
