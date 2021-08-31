import {Action} from "@ngrx/store";
import {initialSettings, ShoppingCartSettings} from "./settings";
import {ActionTypes, AddToCart, RemoveFromCart} from "./shopping-cart.actions";
import {ShoppingCartItem} from "../../../common/entities/shopping-cart-item";
import * as _ from "lodash";

export function shoppingCartReducer(state = initialSettings, action: Action): ShoppingCartSettings {
  switch (action.type) {
    case ActionTypes.AddToCart:
      return <ShoppingCartSettings>{
        ...state,
        products: addToCart(state.products, (<AddToCart>action).payload.item)
      };

    case ActionTypes.RemoveFromCart:
      return <ShoppingCartSettings>{
        ...state,
        products: removeFromCart(state.products, (<RemoveFromCart>action).payload.item)
      };


    case ActionTypes.ResetCart:
      return <ShoppingCartSettings>{
        ...state,
        products: []
      };

    default:
      return state;
  }
}

function removeFromCart(shoppingCart: ShoppingCartItem[], item: string): ShoppingCartItem[] {
  let cart = _.cloneDeep(shoppingCart);
  const itemToRemove = cart.find(i => i.productId == item);
  if (itemToRemove !== undefined) {
    if (itemToRemove.amount == 1) {
      cart = cart.filter(i => i.productId != item);
    } else {
      itemToRemove.amount = itemToRemove.amount - 1;
    }
  }
  return cart;
}

function addToCart(shoppingCart: ShoppingCartItem[], item: string): ShoppingCartItem[] {
  const cart = _.cloneDeep(shoppingCart);
  const itemToAdd = cart.find(i => i.productId == item);
  if (itemToAdd === undefined) {
    cart.push(Object.assign(new ShoppingCartItem(), {
      productId: item,
      amount: 1
    }))
  } else {
    itemToAdd.amount = itemToAdd.amount + 1;
  }
  return cart;
}
