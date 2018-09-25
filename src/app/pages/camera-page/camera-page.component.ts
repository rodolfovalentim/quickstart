import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { PageBaseComponent } from '../../components/page-base/page-base.component'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { timeout } from 'q';
import { ConfigService } from "../../services/config.service";

@Component({
  selector: 'app-camera-page',
  templateUrl: './camera-page.component.html',
  styleUrls: ['./camera-page.component.scss']
})
export class CameraPageComponent extends PageBaseComponent {

  @ViewChild('videoElement') videoElement: any;
  video: any;
  picture : WebcamImage;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  confirm_picture : String = '';
  selectedFrame : number;
  countdown : number

  nextPage = "";

  takePicBtnText: string;
  takeNewPicBtnText: string;
  backBtnText: string;

  takePicBtnIcon: string[];
  takeNewPicBtnIcon: string[];
  backBtnIcon: string[];
  
  takePicBtnStyle: any;
  takeNewPicBtnStyle: any;
  backBtnStyle: any;
  
  confirmBtnText: string;
  confirmBtnIcon: string[];
  confirmBtnStyle: any;

  thankyouMensage: string;

  constructor(
    private config: ConfigService,
    private router: Router) {

    super("camera", config);
    this.confirm_picture = ''

    this.takePicBtnText = this.pageInfo.takePicButton.text.text || "Tirar foto";
    this.takePicBtnIcon = this.pageInfo.takePicButton.icon.split("-") || ["far", "home"]
    this.takePicBtnStyle = {
      'background-color': this.pageInfo.takePicButton.color || "red",
      'color': this.pageInfo.takePicButton.text.color || "#000",
      'font-family': this.pageInfo.takePicButton.text.fontName || "serif"
    }

    this.takeNewPicBtnText = this.pageInfo.takeNewPicButton.text.text || "Tira outra foto";
    this.takeNewPicBtnIcon = this.pageInfo.takeNewPicButton.icon.split("-") || ["far", "home"]
    this.takeNewPicBtnStyle = {
      'background-color': this.pageInfo.takeNewPicButton.color || "red",
      'color': this.pageInfo.takeNewPicButton.text.color || "#000",
      'font-family': this.pageInfo.takeNewPicButton.text.fontName || "serif"
    }

    this.backBtnText = this.pageInfo.takeNewPicButton.text.text || "Tira outra foto";
    this.backBtnIcon = this.pageInfo.backButton.icon.split("-") || ["far", "home"]
    this.backBtnStyle = {
      'background-color': this.pageInfo.backButton.color || "red",
      'color': this.pageInfo.backButton.text.color || "#000",
      'font-family': this.pageInfo.backButton.text.fontName || "serif"
    }

    this.confirmBtnText = this.pageInfo.confirmButton.text.text || "Tira outra foto";
    this.confirmBtnIcon = this.pageInfo.confirmButton.icon.split("-") || ["far", "home"]
    this.confirmBtnStyle = {
      'background-color': this.pageInfo.confirmButton.color || "red",
      'color': this.pageInfo.confirmButton.text.color || "#000",
      'font-family': this.pageInfo.confirmButton.text.fontName || "serif"
    }

    this.thankyouMensage = this.pageInfo.thankyouMensage.text;
    this.nextPage = this.pageInfo.next;
  }

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

  public handleImage(webcamImage: WebcamImage): void {
    
    this.picture = webcamImage;
    console.log(this.picture.imageAsDataUrl)
    this.confirm_picture = this.picture.imageAsDataUrl
    this.router.navigateByUrl(this.next);
  } 

  public printPicture(){
    // this.http.post('http://localhost:8080/agazeta/camera/foto', {'base64':this.picture.imageAsDataUrl, frame : this.selectedFrame})
    //   .pipe()
    //   .subscribe(response => {
    //     this.confirm_picture = '';
    //   })
  }

  goToWelcome(){
    document.location.href = 'http://localhost:8080/agazeta/intro';
  }


}
