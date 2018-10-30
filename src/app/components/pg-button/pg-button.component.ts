import { Component, OnInit, Input } from '@angular/core';
import { ButtonModel } from 'src/app/models/button-model';
import { TextModel } from 'src/app/models/text-model';

@Component({
  selector: 'app-pg-button',
  templateUrl: './pg-button.component.html',
  styleUrls: ['./pg-button.component.scss']
})
export class PgButtonComponent implements OnInit {
  @Input() btn?: ButtonModel

  constructor() { }

  ngOnInit() {
  }

}
