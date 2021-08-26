import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "./app-config.service";
import {map, share} from 'rxjs/operators'
import {CatalogProduct} from "./entities/catalog-product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatalogProductsService {

  constructor(private http: HttpClient, private env: AppConfigService) { }

  public getAllCatalogProducts(): Observable<CatalogProduct[]> {
    return this.http.get(this.env.catalogResourcesUrl)
      .pipe(
        map(response => Object.assign([], response)),
        map(response => response.map(data => Object.assign(new CatalogProduct(), data))),
        share());
  }
}
