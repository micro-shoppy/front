import {Action} from "@ngrx/store";

export enum ActionTypes {
  AddToCart = '[Shopping Cart Component] Added product',
  RemoveFromCart = '[Shopping Cart Component] Removed product',
  ResetCart = '[Shopping Cart Component] Reset Cart'
}

export class AddToCart implements Action {
  readonly type = ActionTypes.AddToCart;

  constructor(public payload: { item: string }) {
  }
}

export class RemoveFromCart implements Action {
  readonly type = ActionTypes.RemoveFromCart;

  constructor(public payload: { item: string }) {
  }
}

export class ResetCart implements Action {
  readonly type = ActionTypes.ResetCart;
}
