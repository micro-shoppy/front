import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as _ from 'lodash';
import {ShoppingCartSettings} from "./settings/settings";
import {selectSettings} from "./settings/shopping-cart.selectors";
import {AddToCart, RemoveFromCart, ResetCart} from "./settings/shopping-cart.actions";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: string[];

  constructor(private store: Store<ShoppingCartSettings>) {
    this.store.select(selectSettings).subscribe(settings => this.cart = _.cloneDeep(settings.products));
  }

  ngOnInit(): void {
  }

  removeFromCart(item: string): void  {
    this.store.dispatch(new RemoveFromCart({item: item}));
  }

  addToCart(item: string): void {
    this.store.dispatch(new AddToCart({item: item}));
  }

  resetCart(): void {
    this.store.dispatch(new ResetCart());
  }
}
