import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { WebcamModule } from 'ngx-webcam';
import { IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from '@ngx-material-keyboard/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { JackpotPageComponent } from './pages/jackpot-page/jackpot-page.component';
import { CameraPageComponent } from './pages/camera-page/camera-page.component';
import { PhotoPageComponent } from './pages/photo-page/photo-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

import { AuthGuardService } from './auth.guard';

import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './services/config.service';

export function initializeApp(appConfig: ConfigService) {
  return () => appConfig.load();
}

const customLayouts: IKeyboardLayouts = {
  ...keyboardLayouts,
  'Tölles Läyout': {
    'name': 'Awesome layout',
    'keys': [
      [
        ['1', '!'],
        ['2', '@'],
        ['3', '#']  
      ]
    ],
    'lang': ['de-CH']
  }
};


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    JackpotPageComponent,
    CameraPageComponent,
    PhotoPageComponent,
    DashboardPageComponent,
    QuizPageComponent,
    WelcomePageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    HttpClientModule,
    WebcamModule,
    MatKeyboardModule,
    MatStepperModule  
  ],
  providers: [ AuthGuardService, {provide: MAT_KEYBOARD_LAYOUTS, useValue: customLayouts}, 
    ConfigService, { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigService], multi: true }],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
