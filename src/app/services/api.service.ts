import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginResultModel} from '../models/LoginResultModel'
import { Page } from '../models/Page'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  loginUrl = 'https://reqres.in/api/login'
  configUrl = 'https://10ff153d-9119-4e8b-8fe6-315a78878073.mock.pstmn.io/config';

  constructor(private http: HttpClient) { 

  }

  login(email: string, password: string): Observable<LoginResultModel>{
    return this.http.post<LoginResultModel>(this.loginUrl, {
      email: email,
      password: password
    });
  }

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(this.configUrl);
  } 
  
  getImages() {

  }
}