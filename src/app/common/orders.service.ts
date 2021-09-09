import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "./app-config.service";
import {ShoppingCartItem} from "./entities/shopping-cart-item";
import {Observable, of} from "rxjs";
import {Order, shoppingCartItemsToOrder} from "./entities/order";
import {catchError, map, share, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orderUrl: string;

  constructor(private http: HttpClient, private env: AppConfigService) {
    this.orderUrl = env.ordersResourcesUrl;
  }

  createOrder(items: ShoppingCartItem[]): Observable<boolean> {
    const order = shoppingCartItemsToOrder(items).products;
    console.log(order);
    return this.http.post(this.orderUrl, {
      orderedProducts: order
    }, this.env.getAuthHeader())
      .pipe(
        map(() => true),
        catchError(() => of(false)),
        share()
      );
  }

  getOrders(): Observable<Order[]> {
    return this.http.get(this.orderUrl, this.env.getAuthHeader())
      .pipe(
        map(data => Object.assign([], data)),
        tap(list => list.forEach(order => Object.assign(new Order(), order))),
        share()
      )
  }
}
