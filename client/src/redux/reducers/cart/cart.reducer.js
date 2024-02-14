import { CartActionTypes } from "./cart.types";
import {
  addUniqueItemsToCart,
  removeItemFromCart,
  deleteItemFromCart,
  changeProductColor,
} from "./cart.utils";
const INITIAL_STATE = {
  cartItems: [],
  drawerVisible: false,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: addUniqueItemsToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.DELETE_FROM_CART:
      return {
        ...state,
        cartItems: deleteItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CHANGE_PRODUCT_COLOR:
      return {
        ...state,
        cartItems: changeProductColor(state.cartItems, action.payload),
      };
    case CartActionTypes.TOGGLE_DRAWER:
      return {
        ...state,
        drawerVisible: !state.drawerVisible,
      };
    case CartActionTypes.EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
