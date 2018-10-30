import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PageBaseComponent } from '../../components/page-base/page-base.component'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'q';
import { ConfigService } from "../../services/config.service";
import { TextModel } from '../../models/text-model';
import { ButtonModel } from '../../models/button-model';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Frame } from 'src/app/models/app-config';

library.add(fas, far);

@Component({
  selector: 'app-camera-page',
  templateUrl: './camera-page.component.html',
  styleUrls: ['./camera-page.component.scss']
})
export class CameraPageComponent extends PageBaseComponent {

  @ViewChild('videoElement') videoElement: any
  video: any
  picture: WebcamImage

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>()
  confirm_picture: string = ''
  selectedFrame: number
  countdown: number

  takePicBtn: ButtonModel
  takeNewPicBtn: ButtonModel
  backBtn: ButtonModel
  confirmBtn: ButtonModel
  thankyouMessage: TextModel

  frames: Frame[]
  currentFrame: number

  state: string

  constructor(
    private config: ConfigService,
    private router: Router) {

    super("camera", config);

    this.confirm_picture = ''
    this.state = "take"

    this.takePicBtn = new ButtonModel(this.pageInfo.takePicButton)
    this.takeNewPicBtn = new ButtonModel(this.pageInfo.takeNewPicButton)
    this.backBtn = new ButtonModel(this.pageInfo.backButton)
    this.confirmBtn = new ButtonModel(this.pageInfo.confirmButton)
    this.thankyouMessage = new TextModel(this.pageInfo.thankyouMensage)
    this.frames = this.pageInfo.frames
    this.currentFrame = 0
  }

  public triggerSnapshot(): void {
    this.confirm_picture = ''
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

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.picture = webcamImage;
    console.log(this.picture)
    this.confirm_picture = this.picture.imageAsDataUrl
    this.state = "show"
  }

  public printPicture() {
    // this.http.post('http://localhost:8080/agazeta/camera/foto', {'base64':this.picture.imageAsDataUrl, frame : this.selectedFrame})
    //   .pipe()
    //   .subscribe(response => {
    //     this.confirm_picture = '';
    //   })
  }

  selectFrame(frameNumber) {
    this.currentFrame = frameNumber
  }

  thanks() {
    this.state = "end"
  }

  finish() {
    this.router.navigateByUrl(this.next);
  }
}
