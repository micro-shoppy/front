import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ShoppingCartSettings} from "./settings";

export const selectSettings = createFeatureSelector<ShoppingCartSettings>('shopping-cart');

export const getShoppingCart = createSelector(selectSettings, settings => settings.products);
