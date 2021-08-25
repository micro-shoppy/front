import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {CatalogProductsService} from "../../common/catalog-products.service";
import {Subscription} from "rxjs";
import {CatalogProduct} from "../../common/entities/catalog-product";

@Component({
  selector: 'app-product-list',
  templateUrl: './catalog-product-list.component.html',
  styleUrls: ['./catalog-product-list.component.css']
})
export class CatalogProductListComponent implements OnInit, OnDestroy {
  @Input()
  cols: number;
  $products: Subscription
  products: CatalogProduct[]

  constructor(private catalogProductService: CatalogProductsService) { }

  ngOnInit(): void {
    console.log('Fetching products...')
    this.$products = this.catalogProductService.getAllCatalogProducts()
      .subscribe(list => this.products = [...list]);
  }

  ngOnDestroy(): void {
    this.$products.unsubscribe();
  }

}
