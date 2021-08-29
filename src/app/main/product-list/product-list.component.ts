import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Product} from "../../common/entities/product";
import {ProductsService} from "../../common/products.service";

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

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.products = [];
    console.log('Fetching products...')
    this.products$ = this.productsService.getAllProducts().subscribe(products => this.products = products);
  }

  ngOnDestroy(): void {
    this.products$.unsubscribe();
  }

}
