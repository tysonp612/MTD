import React from "react";
import { Link } from "react-router-dom";

export const ProductInfoCard = ({ product }) => {
  const {
    price,
    subcategory,
    category,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;
  return (
    <ul className="list-group">
      <li className="list-group-items pb-4 d-flex">
        <div className="flex-grow-1">Price:</div>
        <span>${price}</span>
      </li>
      <li className="list-group-items pb-4 d-flex">
        <div className="flex-grow-1">Category:</div>
        {category ? (
          <Link to={`/category/${category.slug}`}>{category.name}</Link>
        ) : (
          ""
        )}
      </li>
      <li className="list-group-items pb-4 d-flex ">
        <div className="flex-grow-1">Sub Category</div>
        {subcategory
          ? subcategory.map((sub) => {
              return (
                <Link
                  to={`/sub-category/${sub.slug}`}
                  className="p-2"
                  key={sub._id}
                >
                  {sub.name}
                </Link>
              );
            })
          : ""}
      </li>
      <li className="list-group-items pb-4 d-flex">
        <div className="flex-grow-1">Shipping:</div>
        <span>{shipping}</span>
      </li>
      <li className="list-group-items pb-4 d-flex">
        <div className="flex-grow-1">Color:</div>
        <span>{color}</span>
      </li>
      <li className="list-group-items pb-4 d-flex">
        <div className="flex-grow-1">Brand:</div>
        <span>{brand}</span>
      </li>
      <li className="list-group-items pb-4 d-flex">
        <div className="flex-grow-1">Avalability:</div>
        <span>{quantity}</span>
      </li>
      <li className="list-group-items pb-4 d-flex">
        <div className="flex-grow-1">Sold:</div>
        <span>{sold}</span>
      </li>
    </ul>
  );
};
