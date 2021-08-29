import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {CatalogProductsService} from "../../common/catalog-products.service";
import {combineLatest, Subscription} from "rxjs";
import {CatalogProduct} from "../../common/entities/catalog-product";
import {SalesProduct} from "../../common/entities/sales-product";
import {SalesProductsServiceService} from "../../common/sales-products-service.service";
import {mergeProducts, Product} from "../../common/entities/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Input()
  cols: number;
  products$: Subscription;
  products: Product[];

  constructor(private catalogProductService: CatalogProductsService,
              private salesProductService: SalesProductsServiceService) { }

  ngOnInit(): void {
    this.products = [];
    console.log('Fetching products...')
    this.products$ = combineLatest([this.catalogProductService.getAllCatalogProducts(), this.salesProductService.getAllSalesProducts()])
      .subscribe(([catalogs, sales]: [CatalogProduct[], SalesProduct[]]) => {
        if (catalogs.length > 0 && sales.length > 0) {
          catalogs.forEach(c =>
            this.products = [...this.products, mergeProducts(c, sales.find(s => s.productId === c.productId))])
        }
      })
  }

  ngOnDestroy(): void {
    this.products$.unsubscribe();
  }

}
