import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "antd";
import {
  EyeOutlined,
  ShoppingCartOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import productsDefaultImages from "./../images/techdevices.jpeg";
import { ShowAverage } from "./../rating/average-rating.component";
import { CartActionTypes } from "../../redux/reducers/cart/cart.types";
import { Link } from "react-router-dom";

export const ProductCard = ({
  product,
  okay = false,
  handleRemoveWishList,
}) => {
  const { title, description, images, slug, ratings } = product;
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { Meta } = Card;
  const handleAddToCart = () => {
    dispatch({
      type: CartActionTypes.ADD_TO_CART,
      payload: product,
    });
    dispatch({
      type: CartActionTypes.TOGGLE_DRAWER,
    });
  };
  const checkItemInCart = () => {
    const itemInCart = cartItems.find(
      (cartItem) => cartItem._id === product._id
    );
    if (itemInCart) {
      return (
        <Link to={`/cart`}>
          <CheckOutlined disabled={true} />
          <br />
          Item added to cart
        </Link>
      );
    } else if (product.quantity === 0) {
      return (
        <>
          <ShoppingCartOutlined disabled={true} />
          <p className="text-danger">Out of Stock</p>
        </>
      );
    } else {
      return <ShoppingCartOutlined onClick={handleAddToCart} />;
    }
  };
  return (
    <>
      {ratings && ratings.length ? (
        <ShowAverage product={product} />
      ) : (
        <div className="text-center pb-3">No rating yet</div>
      )}

      {okay ? (
        <Card
          cover={
            <img
              style={{ height: "200px", objectFit: "cover" }}
              className="p-1"
              src={
                images && images.length ? images[0].url : productsDefaultImages
              }
            />
          }
          actions={[
            <Link to={`/product/${slug}`}>
              <EyeOutlined className="text-warning" />
            </Link>,
            <>{checkItemInCart()}</>,
            <DeleteOutlined
              className="text-danger"
              onClick={() => handleRemoveWishList(product._id)}
            />,
          ]}
        >
          <Meta
            title={title}
            description={`${description && description.substring(0, 40)}...`}
          />
        </Card>
      ) : (
        <Card
          cover={
            <img
              style={{ height: "200px", objectFit: "cover" }}
              className="p-1"
              src={
                images && images.length ? images[0].url : productsDefaultImages
              }
            />
          }
          actions={[
            <Link to={`/product/${slug}`}>
              <EyeOutlined className="text-warning" />
            </Link>,
            <>{checkItemInCart()}</>,
          ]}
        >
          <Meta
            title={title}
            description={`${description && description.substring(0, 40)}...`}
          />
        </Card>
      )}
    </>
  );
};
