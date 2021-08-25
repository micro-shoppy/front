import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {CatalogProductsService} from "../../common/catalog-products.service";
import {Subscription} from "rxjs";
import {CatalogProduct} from "../../common/entities/catalog-product";
import {SalesProduct} from "../../common/entities/sales-product";
import {SalesProductsServiceService} from "../../common/sales-products-service.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './catalog-product-list.component.html',
  styleUrls: ['./catalog-product-list.component.css']
})
export class CatalogProductListComponent implements OnInit, OnDestroy {
  @Input()
  cols: number;
  $catalogProducts: Subscription
  catalogProducts: CatalogProduct[]
  $salesProducts: Subscription
  salesProducts: SalesProduct[]

  constructor(private catalogProductService: CatalogProductsService,
              private salesProductService: SalesProductsServiceService) { }

  ngOnInit(): void {
    console.log('Fetching products...')
    this.$catalogProducts = this.catalogProductService.getAllCatalogProducts()
      .subscribe(list => this.catalogProducts = [...list]);
    this.$salesProducts = this.salesProductService.getAllSalesProducts()
      .subscribe(list => this.salesProducts = [...list]);
  }

  ngOnDestroy(): void {
    this.$catalogProducts.unsubscribe();
    this.$salesProducts.unsubscribe();
  }

}
