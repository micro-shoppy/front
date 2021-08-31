import {ShoppingCartItem} from "../../../common/entities/shopping-cart-item";

export class ShoppingCartSettings {
  products: ShoppingCartItem[]
}

export const initialSettings: ShoppingCartSettings = {
  products: []
}
