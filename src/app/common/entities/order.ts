import {ShoppingCartItem} from "./shopping-cart-item";

export class Order {
  orderId: string;
  orderedProducts: {} = {};
  status: string;
}


export function shoppingCartItemsToOrder(shoppingCartItems: ShoppingCartItem[]): Order {
  const order = new Order();
  shoppingCartItems.forEach( item => order.orderedProducts[item.productId] = item.amount);
  console.log(order);
  return order;
}
