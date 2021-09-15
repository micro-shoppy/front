import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor() { }

  getAuthHeader() {
    return { headers: new HttpHeaders().set('Authorization',  `Bearer ${localStorage.getItem("access_token")}`)}
  }

  get catalogResourcesUrl(): string {
    return environment.catalogResourcesUrl;
  }

  get salesResourcesUrl(): string {
    return environment.salesResourcesUrl;
  }

  get usersResourcesUrl(): string {
    return environment.usersResourcesUrl;
  }

  get ordersResourcesUrl(): string {
    return environment.ordersResourcesUrl;
  }
}
