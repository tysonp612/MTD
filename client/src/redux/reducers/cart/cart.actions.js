import { CartActionTypes } from "./cart.types";

export const addToCart = (item) => {
  return {
    type: CartActionTypes.ADD_TO_CART,
    payload: item,
  };
};
export const removeFromCart = (item) => {
  return {
    type: CartActionTypes.REMOVE_FROM_CART,
    payload: item,
  };
};
export const deleteFromCart = (item) => {
  return {
    type: CartActionTypes.DELETE_FROM_CART,
    payload: item,
  };
};

export const changeProductColor = (item, color) => {
  return {
    type: CartActionTypes.CHANGE_PRODUCT_COLOR,
    payload: { item, color },
  };
};
export const toggleDrawer = () => {
  return {
    type: CartActionTypes.TOGGLE_DRAWER,
  };
};
export const emptyCart = () => {
  return {
    type: CartActionTypes.EMPTY_CART,
  };
};
