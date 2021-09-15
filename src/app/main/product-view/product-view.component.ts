import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../common/entities/product";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {ShoppingCartSettings} from "../shopping-cart/settings/settings";
import {selectSettings} from "../shopping-cart/settings/shopping-cart.selectors";
import * as _ from "lodash";
import {AddToCart} from "../shopping-cart/settings/shopping-cart.actions";
import {ProductsService} from "../../common/products.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit, OnDestroy {
  productId: string;
  product: Product = Product.placeholder;
  product$: Subscription;
  cartSettings: ShoppingCartSettings;

  constructor(private router: Router, private route: ActivatedRoute,
              private productService: ProductsService,
              private store: Store<ShoppingCartSettings>) {
    this.store.select(selectSettings).subscribe(settings => this.cartSettings = _.cloneDeep(settings));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.product$ = this.productService.getProduct(this.productId).subscribe(
        product => {
          console.log(product)
          this.product = product
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              console.log('Product doesn\'t exist...')
            }
          }
        });
    });
  }

  ngOnDestroy() {
    this.product$.unsubscribe();
  }

  addToCart(item: string): void {
    this.store.dispatch(new AddToCart({item: this.productId}));
  }

}
