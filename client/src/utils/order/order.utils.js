import axios from "axios";

export const createOrder = async (paymentIntent, authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/order/createOrder`,
    { paymentIntent },
    {
      headers: { authToken },
    }
  );
};

export const getOrders = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/order/getOrders`, {
    headers: { authToken },
  });
};

export const adminGetAllorders = async (authToken) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/admin/order/getAllOrders`,
    {
      headers: { authToken },
    }
  );
};

export const adminUpdateOrders = async (authToken, orderId, update) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/admin/order/updateOrders`,
    {
      orderId,
      update,
    },
    {
      headers: { authToken },
    }
  );
};
