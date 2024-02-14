import axios from "axios";
export const getAllCoupons = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/get-coupons`, {
    headers: { authToken },
  });
};
export const removeCoupon = async (authToken, id) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/delete-coupon/${id}`,
    {
      headers: { authToken },
    }
  );
};
export const createCoupon = async (authToken, coupon) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-coupon`,
    { coupon },
    {
      headers: { authToken },
    }
  );
};
