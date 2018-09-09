import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from '../models/AppConfig.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

    static settings: IAppConfig;

    constructor(private http: HttpClient) { }

    load() {
        const jsonFile = `assets/config/config.${environment.name}.json`;
        this.http.get<any>(jsonFile)
            .subscribe(result => {
            ConfigService.settings = <IAppConfig>result
            console.log("Config", ConfigService.settings);
            error => console.log("HTTP Error", error)
        });
    }
}