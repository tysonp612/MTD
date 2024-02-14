import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
export const TableComponent = ({ order }) => {
  return (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Quantity</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((prod, i) => {
          return (
            <tr key={i}>
              <td>
                <b>{prod.product.title}</b>
              </td>
              <td>${prod.product.price}</td>
              <td>{prod.product.brand}</td>
              <td>{prod.color}</td>
              <td>{prod.cartQuantity}</td>
              <td>
                {prod.product.shipping === "Yes" ? (
                  <CheckCircleOutlined style={{ color: "green" }} />
                ) : (
                  <CloseCircleOutlined style={{ color: "red" }} />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
