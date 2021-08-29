import {Action} from "@ngrx/store";
import {initialSettings, ShoppingCartSettings} from "./settings";
import {ActionTypes, AddToCart, RemoveFromCart} from "./shopping-cart.actions";

export function shoppingCartReducer(state = initialSettings, action:Action): ShoppingCartSettings {
  switch (action.type) {
    case ActionTypes.AddToCart:
      return <ShoppingCartSettings> {
        ...state,
        products: [...state.products, (<AddToCart>action).payload.item]
      };

    case ActionTypes.RemoveFromCart:
      const products: string[] = state.products;
      removeFromCart(products, (<RemoveFromCart>action).payload.item)
      return <ShoppingCartSettings> {
        ...state,
        products: products
      };

    case ActionTypes.ResetCart:
      return <ShoppingCartSettings> {
        ...state,
        products: []
      };

    default:
      return state;
  }
}

function removeFromCart(products: string[], item: string): void {
  const indexToRemove = products.findIndex(p => p === item);
  products.splice(indexToRemove, 1);
}
