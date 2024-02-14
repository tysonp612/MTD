import React from "react";
import { Card } from "antd";
import productsDefaultImages from "./../images/techdevices.jpeg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Meta } = Card;

const AdminProductCard = ({ product, handleProductDelete }) => {
  const { title, description, images, slug } = product;

  return (
    <Card
      cover={
        <img
          style={{ height: "200px", objectFit: "cover" }}
          className="p-1"
          src={images && images.length ? images[0].url : productsDefaultImages}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleProductDelete(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};
export default AdminProductCard;
