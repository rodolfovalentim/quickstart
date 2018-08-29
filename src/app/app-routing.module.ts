import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent} from './pages/register-page/register-page.component';
import { JackpotPageComponent } from './pages/jackpot-page/jackpot-page.component';
import { CameraPageComponent } from './pages/camera-page/camera-page.component';
import { PhotoPageComponent } from './pages/photo-page/photo-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent},
  { path: 'jackpot', component: JackpotPageComponent},
  { path: 'camera', component: CameraPageComponent},
  { path: 'photo', component: PhotoPageComponent},
  { path: 'dashboard', component: DashboardPageComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
