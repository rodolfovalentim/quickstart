import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from '../models/app-config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

    static settings: IAppConfig;

    constructor(private http: HttpClient) {

    }

    load() {
        const jsonFile = 'assets/config/config.json';
        return this.http.get<IAppConfig>(jsonFile);
    }
}