import axios from "axios";

export const updateCart = async (cart, authToken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/user/addToCart`,
    {
      cart: cart,
    },
    { headers: { authToken } }
  );
};

export const getCart = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/getCart`, {
    headers: { authToken },
  });
};
export const emptyCart = async (authToken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/user/emptyCart`, {
    headers: { authToken },
  });
};

export const updateAddress = async (authToken, address) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/user/updateAddress`,
    { address },
    {
      headers: { authToken },
    }
  );
};
export const applyCoupon = async (authToken, coupon) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/applyCoupon`,
    { coupon },
    {
      headers: { authToken },
    }
  );
};

export const addToWishList = async (authToken, productId) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/add-wishlist`,
    { productId },
    {
      headers: { authToken },
    }
  );
};
export const getAllWishList = async (authToken) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/user/get-wishlist`,

    {
      headers: { authToken },
    }
  );
};
export const removeFromWishList = async (authToken, productId) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/user/remove-wishlist/${productId}`,
    {
      headers: { authToken },
    }
  );
};
