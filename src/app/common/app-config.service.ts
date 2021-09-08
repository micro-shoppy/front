import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor() { }

  get catalogResourcesUrl(): string {
    return environment.catalogResourcesUrl;
  }

  get salesResourcesUrl(): string {
    return environment.salesResourcesUrl;
  }

  get usersResourcesUrl(): string {
    return environment.usersResourcesUrl;
  }
}
