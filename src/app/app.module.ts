import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WebcamModule } from 'ngx-webcam';
import { FormWizardModule } from 'angular2-wizard';
import { ReactiveFormsModule } from '@angular/forms'
import { IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from '@ngx-material-keyboard/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { JackpotPageComponent } from './pages/jackpot-page/jackpot-page.component';
import { CameraPageComponent } from './pages/camera-page/camera-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { EndPageComponent } from './pages/end-page/end-page.component';

import { AuthGuardService } from './auth.guard';


import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';

import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './services/config.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageBaseComponent } from './components/page-base/page-base.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { PgButtonComponent } from './components/pg-button/pg-button.component';

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
    DashboardPageComponent,
    QuizPageComponent,
    WelcomePageComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    PageBaseComponent,
    EndPageComponent,
    PgButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormWizardModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatGridListModule,
    HttpClientModule,
    WebcamModule,
    MatKeyboardModule,
    MatStepperModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SplitButtonModule
  ],
  providers: [AuthGuardService, { provide: MAT_KEYBOARD_LAYOUTS, useValue: customLayouts },
    ConfigService, { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ConfigService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
