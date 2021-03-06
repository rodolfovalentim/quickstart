import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth.guard';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent} from './pages/register-page/register-page.component';
import { JackpotPageComponent } from './pages/jackpot-page/jackpot-page.component';
import { CameraPageComponent } from './pages/camera-page/camera-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { EndPageComponent } from './pages/end-page/end-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent, canActivate: [AuthGuardService] },
  { path: 'jackpot', component: JackpotPageComponent, canActivate: [AuthGuardService]},
  { path: 'camera', component: CameraPageComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuardService] },
  { path: 'quiz', component: QuizPageComponent, canActivate: [AuthGuardService] },
  { path: 'welcome', component: WelcomePageComponent, canActivate: [AuthGuardService] },
  { path: 'end', component: EndPageComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
