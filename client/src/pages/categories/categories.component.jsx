import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductFromCategory } from "./../../utils/products/products.utils";
import { ProductCard } from "./../../components/card/regular.product-card.component";
export const CategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const { slug } = useParams();
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    await getProductFromCategory(slug)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      {products && products.length ? (
        <div className="row ">
          <div className="text-center p-3 mt-5 mb-5 display-6 jumbotron">
            {products.length} Products in "{products[0].category.name}" category
          </div>
          {products.map((product) => {
            return (
              <div className="col-md-4">
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-3 mt-5 mb-5 display-6 jumbotron">
          No products found
        </div>
      )}
    </div>
  );
};
