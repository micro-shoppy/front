import {ShoppingCartItem} from "./shopping-cart-item";

export class Order {
  id: string;
  orderedProducts: {} = {};
  status: number;
}


export function shoppingCartItemsToOrder(shoppingCartItems: ShoppingCartItem[]): Order {
  const order = new Order();
  shoppingCartItems.forEach( item => order.orderedProducts[item.productId] = item.amount);
  console.log(order);
  return order;
}
