//NOTEŒŒ
export const addUniqueItemsToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item._id.toString() === cartItemToAdd._id.toString()
  );
  if (existingCartItem) {
    if (existingCartItem.cartQuantity === existingCartItem.quantity) {
      return cartItems.map((cartItem) => {
        return cartItem._id === cartItemToAdd._id
          ? { ...cartItem, cartQuantity: cartItem.quantity }
          : cartItem;
      });
    }
    const result = cartItems.map((cartItem) => {
      return cartItem._id === cartItemToAdd._id
        ? { ...cartItem, cartQuantity: cartItem.cartQuantity + 1 }
        : cartItem;
    });
    return result;
  } else {
    return [...cartItems, { ...cartItemToAdd, cartQuantity: 1 }];
  }
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item._id.toString() === cartItemToRemove._id.toString()
  );

  if (existingCartItem.cartQuantity === 1) {
    return cartItems.filter(
      (cartItem) => cartItem._id !== cartItemToRemove._id
    );
  }
  return cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, cartQuantity: cartItem.cartQuantity - 1 }
      : cartItem
  );
};
//Note that we can pass object as payload
export const changeProductColor = (cartItems, cartItemToChangeColor) => {
  const { item, color } = cartItemToChangeColor;
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id.toString() === item._id.toString()
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem._id === item._id
        ? { ...cartItem, color: color }
        : cartItem;
    });
  }
};
export const deleteItemFromCart = (cartItems, cartItemToDelete) => {
  return cartItems.filter((cartItem) => cartItem._id !== cartItemToDelete._id);
};
