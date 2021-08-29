import { Injectable } from '@angular/core';
import {CatalogProductsService} from "./catalog-products.service";
import {SalesProductsService} from "./sales-products.service";
import {mergeProduct, mergeProducts, Product} from "./entities/product";
import {combineLatest, Observable} from "rxjs";
import {CatalogProduct} from "./entities/catalog-product";
import {SalesProduct} from "./entities/sales-product";
import {map, share} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private catalogService: CatalogProductsService,
              private salesService: SalesProductsService) { }

  getAllProducts(): Observable<Product[]> {
    return combineLatest([this.catalogService.getAllCatalogProducts(), this.salesService.getAllSalesProducts()])
      .pipe(
        map(([catalogs, sales]: [CatalogProduct[], SalesProduct[]]) => mergeProducts(catalogs, sales)),
        share())
  }

  getProduct(productId: string): Observable<Product> {
    return combineLatest([this.catalogService.getCatalogProduct(productId), this.salesService.getSalesProduct(productId)])
      .pipe(
        map(([catalog, sale]: [CatalogProduct, SalesProduct]) => mergeProduct(catalog, sale)),
        share())
  }
}
