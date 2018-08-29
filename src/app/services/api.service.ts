import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResultModel} from '../models/LoginResultModel'
import {Config} from '../models/Config'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  loginUrl = 'https://reqres.in/api/login'
  configUrl = 'https://localhost:8000/assets/config.json';

  constructor(private http: HttpClient) { 

  }

  login(email: string, password: string): Observable<LoginResultModel>{
    return this.http.post<LoginResultModel>(this.loginUrl, {
      email: email,
      password: password
    });
  }

  getConfig() {
    return this.http.get(this.configUrl);
  }

  getImages() {

  }
}