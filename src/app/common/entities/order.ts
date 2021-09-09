import {ShoppingCartItem} from "./shopping-cart-item";

export class Order {
  id: string;
  orderedProducts: {} = {};
  status: number;

  get statusString(): String {
    switch (this.status) {
      case 0:
        return "placed";
      case 1:
        return "billed";
      case 2:
        return "completed";
      default:
        return "unknown"
    }
  }
}


export function shoppingCartItemsToOrder(shoppingCartItems: ShoppingCartItem[]): Order {
  const order = new Order();
  shoppingCartItems.forEach( item => order.orderedProducts[item.productId] = item.amount);
  console.log(order);
  return order;
}
