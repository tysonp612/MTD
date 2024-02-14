import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { OrderComponent } from "./../../../components/order/order.component";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import {
  adminGetAllorders,
  adminUpdateOrders,
} from "./../../../utils/order/order.utils";
import { toast } from "react-toastify";
export const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    loadAllOrders();
  }, []);
  const user = useSelector((state) => state.user.currentUser);
  const loadAllOrders = () => {
    adminGetAllorders(user.token)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleStatusChange = (orderId, orderStatus) => {
    adminUpdateOrders(user.token, orderId, orderStatus)
      .then((res) => {
        toast.success("Order status updated!");
        loadAllOrders();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h3>Admin Dashboard</h3>

          <OrderComponent
            orders={orders}
            handleStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
};
