import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { WebcamModule } from 'ngx-webcam';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    WelcomePageComponent
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
    HttpClientModule,
    WebcamModule
  ],
  providers: [ AuthGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule {}
