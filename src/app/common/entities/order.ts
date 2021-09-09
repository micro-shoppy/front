import {ShoppingCartItem} from "./shopping-cart-item";

export class Order {
  orderId: string;
  products: Map<string, number> = new Map<string, number>();
  status: string;
}


export function shoppingCartItemsToOrder(shoppingCartItems: ShoppingCartItem[]): Order {
  const order = new Order();
  shoppingCartItems.forEach( item => order.products.set(item.productId, item.amount));
  console.log(order);
  return order;
}
