import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from '../models/app-config';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

    static settings: IAppConfig;

    constructor(private http: HttpClient) { }

    load(): Promise<any> {
        const jsonFile = `assets/config/config.${environment.name}.json`;
        let promise = new Promise((resolve, reject) => {
          this.http.get(jsonFile)
            .toPromise()
            .then(
              res => {
                ConfigService.settings = <IAppConfig>res;
                console.log("Config", ConfigService.settings);
                resolve();
              }
            );
        });
      return promise;
    }

    getPageInfo(pageType: string){
        for (let page of ConfigService.settings.screens) {
            console.log(page.screenType);
            if (page.screenType == pageType) {
              return page;
            }
        }
    }

    getFirstPage() {
      return ConfigService.settings.screens[0].screenType
    }


}