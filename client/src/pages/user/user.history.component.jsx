// import React, { useState, useEffect } from "react";
// import UserNav from "./../../components/navigation/user-navigation.component";
// import { getOrders } from "./../../utils/order/order.utils";
// import { useSelector } from "react-redux";
// import { ShowPaymentInfo } from "../../components/card/show-payment-info.component.jsx";

// import { TableComponent } from "./../../components/table/product-table.component";
// import { Invoice } from "./../../components/invoice/invoice.component";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// const History = () => {
//   const [orders, setOrders] = useState([]);
//   const user = useSelector((state) => state.user.currentUser);
//   useEffect(() => {
//     loadOrders();
//   }, []);
//   const loadOrders = () => {
//     getOrders(user.token)
//       .then((res) => {
//         console.log(res.data);
//         setOrders(res.data);
//       })
//       .catch((err) => console.log(err));
//   };
//   const showDownloadLink = (order) => {
//     //NOTE https://stackoverflow.com/questions/63280109/how-to-update-webpack-config-for-a-react-project-created-using-create-react-app
//     return (
//       <PDFDownloadLink
//         fileName="invoice.pdf"
//         className="btn btn-sm btnblock btn-outline-primary"
//         document={<Invoice order={order} />}
//       >
//         Download PDF
//       </PDFDownloadLink>
//     );
//   };
//   const showOrderInTable = (order) => {
//     return <TableComponent order={order} />;
//   };
//   const showEachOrders = () => {
//     return orders.map((order, i) => {
//       return (
//         <div key={i} className="m-5 p-3 card">
//           <ShowPaymentInfo order={order} />
//           {showOrderInTable(order)}
//           <div className="row">
//             <div className="col">{showDownloadLink(order)}</div>
//           </div>
//         </div>
//       );
//     });
//   };
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-md-2">
//           <UserNav />
//         </div>
//         <div className="col-md-10 text-center">
//           <h4>
//             {orders.length ? "User purchase orders" : "No purchse orders"}
//           </h4>
//           {showEachOrders()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default History;
