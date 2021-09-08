import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ShoppingCartSettings} from "./settings/settings";
import {selectSettings} from "./settings/shopping-cart.selectors";
import {AddToCart, RemoveFromCart, ResetCart} from "./settings/shopping-cart.actions";
import {ProductsService} from "../../common/products.service";
import {Product} from "../../common/entities/product";
import {zip} from "rxjs";
import * as _ from "lodash";
import {OrdersService} from "../../common/orders.service";
import {ShoppingCartItem} from "../../common/entities/shopping-cart-item";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: [Product, number][] = [];
  checkoutItems: ShoppingCartItem[] = [];
  columns: string[] = ['name', 'amount', 'net', 'gross', 'remove'];
  loggedIn: boolean;

  constructor(private store: Store<ShoppingCartSettings>,
              private productsService: ProductsService,
              private ordersService: OrdersService) {
    this.store.select(selectSettings).subscribe(settings => {
      if (settings.products.length == 0) {
        this.cart = [];
      } else {
        this.checkoutItems = settings.products;
        zip(...settings.products.map(product => productsService.getProduct(product.productId)))
          .subscribe(list => this.cart = list.map(item => [item, settings.products.find(product => product.productId == item.id).amount]));
      }
    })
  }

  ngOnInit(): void {
    this.loggedIn = localStorage.getItem("access_token") != undefined;
  }

  get netSumPrice(): string {
    return _.cloneDeep(this.cart).reduce((sum, currItem) => sum + currItem[0].netPrice * currItem[1], 0).toFixed(2);
  }

  get grossSumPrice(): string {
    return _.cloneDeep(this.cart).reduce((sum, currItem) => sum + currItem[0].grossPrice * currItem[1], 0).toFixed(2);
  }

  addToCart(item: string): void {
    console.log(`Added ${item} to cart`)
    this.store.dispatch(new AddToCart({item: item}));

  }

  removeFromCart(item: string): void {
    console.log(`Removed ${item} from cart`)
    this.store.dispatch(new RemoveFromCart({item: item}));
  }

  resetCart(): void {
    this.store.dispatch(new ResetCart());
  }

  checkout() {
    this.ordersService.createOrder(this.checkoutItems).subscribe();
  }
}
