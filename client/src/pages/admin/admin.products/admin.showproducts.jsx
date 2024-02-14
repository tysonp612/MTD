import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination } from "antd";
import AdminNav from "../../../components/navigation/admin-navigation.component";
import AdminProductCard from "../../../components/card/admin.product-card.component";
import {
  productsCount,
  getAllProductsByCount,
  deleteProduct,
} from "../../../utils/products/products.utils";

export const AdminShowProduct = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [productsQuantity, setProductsQuantity] = useState(0);
  const user = useSelector((state) => state.user.currentUser);
  const productsPerPage = 9;
  useEffect(() => {
    loadProducts();
    loadProductsCount();
  }, [page]);
  const loadProductsCount = async () => {
    await productsCount()
      .then((res) => {
        setProductsQuantity(res.data);
      })
      .catch((err) => console.log(err));
  };
  const loadProducts = async () => {
    await getAllProductsByCount(productsPerPage, page)
      .then((res) => {
        setProducts(res.data);
        console.log(products);
      })
      .catch((err) => console.log(err));
  };
  const handleProductDelete = async (slug) => {
    const deleteConfirm = window.confirm(`Are you sure to delete ${slug}`);
    if (deleteConfirm) {
      await deleteProduct(slug, user.token)
        .then(() => loadProducts())
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <div className="row">
            {products.map((product) => {
              return (
                <div className="col-md-4 pb-3" key={product._id}>
                  <AdminProductCard
                    product={product}
                    handleProductDelete={handleProductDelete}
                  />
                </div>
              );
            })}
            {productsQuantity && (
              <Pagination
                className="text-center pt-3"
                current={page}
                total={Math.round((productsQuantity / productsPerPage) * 10)}
                onChange={(value) => {
                  setPage(value);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
