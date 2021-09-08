import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "./app-config.service";
import {catchError, map, share, tap} from 'rxjs/operators'
import {CatalogProduct} from "./entities/catalog-product";
import {Observable, of} from "rxjs";
import {Product} from "./entities/product";

@Injectable({
  providedIn: 'root'
})
export class CatalogProductsService {

  private readonly catalogURL: string;

  constructor(private http: HttpClient, private env: AppConfigService) {
    this.catalogURL = env.catalogResourcesUrl;
  }

  public getAllCatalogProducts(): Observable<CatalogProduct[]> {
    return this.http.get(this.catalogURL)
      .pipe(
        map(response => Object.assign([], response)),
        map(response => response.map(data => Object.assign(new CatalogProduct(), data))),
        share());
  }

  public getCatalogProduct(productId: string): Observable<CatalogProduct> {
    return this.http.get(`${this.catalogURL}/${productId}`)
      .pipe(
        map(response => Object.assign(new CatalogProduct(), response)),
        share());
  }

  public deleteProduct(productId: string): Observable<any> {
    const url = `${this.catalogURL}/${productId}`;
    console.log(url)
    return this.http.delete(url, this.env.getAuthHeader())
      .pipe(
        map(() => {
          console.log(`Product ${productId} removed successfully!`)
          return true;
        }),
        catchError(() => of(false)), share()
      )
  }

  public addProduct(product: Product): Observable<boolean> {
    return this.http.post(this.catalogURL, {
      name: product.name,
      description: product.description,
      netPrice: product.netPrice,
      taxPercentage: product.taxPercentage
    }, this.env.getAuthHeader())
      .pipe(
        map(() => true),
        tap(() => console.log(`Product ${product.id} added successfully`)),
        share()
      )
  }
}
