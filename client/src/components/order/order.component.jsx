import React from "react";
// import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design.icons";
import { ShowPaymentInfo } from "./../card/show-payment-info.component";
import { TableComponent } from "./../table/product-table.component";
export const OrderComponent = ({ orders, handleStatusChange }) => {
  return (
    <>
      {orders.map((order) => {
        return (
          <div key={order._id} className="row pb-5">
            <div className="btn btn-block bg-light">
              <ShowPaymentInfo order={order} />
              <div className="row">
                <div className="col-md-2">Delivery Status</div>
                <div className="col-md-2">
                  <select
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="form-control"
                    value={order.orderStatus}
                  >
                    <option value="Not Processed">Not Processed</option>
                    <option value="Processing">Processing</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="col-md-4">
                  Customer: {order.orderedBy.name} - Address:
                  {order.orderedBy.address}
                </div>
              </div>
            </div>
            <div className="row">
              <TableComponent order={order} />
            </div>
          </div>
        );
      })}
    </>
  );
};
