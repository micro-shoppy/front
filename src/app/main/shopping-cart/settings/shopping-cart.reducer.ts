import {Action} from "@ngrx/store";
import {initialSettings, ShoppingCartSettings} from "./settings";
import {ActionTypes, AddToCart, RemoveFromCart} from "./shopping-cart.actions";
import * as _ from "lodash";

export function shoppingCartReducer(state = initialSettings, action:Action): ShoppingCartSettings {
  switch (action.type) {
    case ActionTypes.AddToCart:
      return <ShoppingCartSettings> {
        ...state,
        products: [...state.products, (<AddToCart>action).payload.item]
      };

    case ActionTypes.RemoveFromCart:
      return <ShoppingCartSettings> {
        ...state,
        products: removeFromCart(state.products, (<RemoveFromCart>action).payload.item)
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

function removeFromCart(products: string[], item: string): string[] {
  let arr = _.cloneDeep(products);
  const indexToRemove = arr.findIndex(p => p === item);
  arr.splice(indexToRemove, 1);
  return arr;
}
