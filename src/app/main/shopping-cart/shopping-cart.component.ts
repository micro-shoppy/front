import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ShoppingCartSettings} from "./settings/settings";
import {selectSettings} from "./settings/shopping-cart.selectors";
import {RemoveFromCart, ResetCart} from "./settings/shopping-cart.actions";
import {ProductsService} from "../../common/products.service";
import {Product} from "../../common/entities/product";
import {zip} from "rxjs";
import * as _ from "lodash";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: Product[] = [];
  columns: string[] = ['name', 'net', 'gross', 'remove'];

  constructor(private store: Store<ShoppingCartSettings>,
              private productsService: ProductsService) {
    this.store.select(selectSettings).subscribe(settings => {
      if (settings.products.length == 0) {
        this.cart = [];
      } else {
        zip(...settings.products.map(productId => productsService.getProduct(productId)))
          .subscribe(list => this.cart = list);
      }
    })
  }

  ngOnInit(): void {
  }

  get netSumPrice(): string {
    return _.cloneDeep(this.cart).reduce((sum, currItem) => sum + currItem.netPrice, 0).toFixed(2);
  }

  get grossSumPrice(): string {
    return _.cloneDeep(this.cart).reduce((sum, currItem) => sum + currItem.grossPrice, 0).toFixed(2);
  }

  removeFromCart(item: string): void {
    console.log(`Removed ${item} from cart`)
    this.store.dispatch(new RemoveFromCart({item: item}));
  }

  resetCart(): void {
    this.store.dispatch(new ResetCart());
  }

  checkout() {
    /* TODO:
    Send saga to rabbit about order
     */

  }
}
