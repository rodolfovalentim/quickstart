import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from '../models/app-config';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

    static settings: IAppConfig;
    pageManager: number;

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
        }
    }

    getNextPage(begin?:boolean) {
      if (begin) {
        this.pageManager = 0;
      } else {
        this.pageManager += 1;
      }

      if (this.pageManager > ConfigService.settings.screens.length) {
        this.pageManager = this.pageManager%ConfigService.settings.screens.length;
      }      
      console.log("Next Page: ", ConfigService.settings.screens[this.pageManager].screenType)
      return ConfigService.settings.screens[this.pageManager].screenType
    }


}