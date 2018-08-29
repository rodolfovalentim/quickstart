import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'q';

@Component({
  selector: 'app-camera-page',
  templateUrl: './camera-page.component.html',
  styleUrls: ['./camera-page.component.scss']
})
export class CameraPageComponent implements OnInit {

  @ViewChild('videoElement') videoElement: any;
  video: any;
  picture : WebcamImage;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  confirm_picture : String = '';

  selectedFrame : number;
  countdown : number
  isPlaying = false;

  displayControls = true;

  public triggerSnapshot(): void {    
    this.confirm_picture = ''
    this.countdown = 3;
    this.decrementCountdown()

  }

  decrementCountdown(){
    setTimeout(() => {
      this.countdown = this.countdown - 1
      if (this.countdown > 0)
        this.decrementCountdown()
      else{
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

  ngOnInit() {
    this.selectedFrame = 1
  }

  changeFrame(frame){
    this.selectedFrame = frame;
    console.log(this.selectedFrame)
  }

  start() {
    this.initCamera({ video: true, audio: false });
  }

  pause() {
    this.video.pause();
  }

  toggleControls() {
    this.video.controls = this.displayControls;
    this.displayControls = !this.displayControls;
  }

  resume() {
    this.video.play();
  }

  sound() {
    this.initCamera({ video: true, audio: true });
  }

  initCamera(config:any) {
    var browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.src = window.URL.createObjectURL(stream);
      this.video.play();
    });
  }

  public handleImage(webcamImage: WebcamImage): void {
    
    this.picture = webcamImage;
    console.log(this.picture.imageAsDataUrl)

    this.confirm_picture = this.picture.imageAsDataUrl    
  } 

  public printPicture(){
    this.http.post('http://localhost:8080/agazeta/camera/foto', {'base64':this.picture.imageAsDataUrl, frame : this.selectedFrame})
      .pipe()
      .subscribe(response => {
        this.confirm_picture = '';
      })
  }

  public constructor(private router : Router,private http: HttpClient){
    this.confirm_picture = ''
  }

  goToWelcome(){
    document.location.href = 'http://localhost:8080/agazeta/intro';
  }


}
