import React, { useState, useEffect } from "react";
import AdminNav from "./../../../components/navigation/admin-navigation.component";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ProductUpdateForm } from "./../../../components/forms/product-update-form.component";
import { FileUploadForm } from "./../../../components/forms/fileupload-form.component";
import {
  getOneProduct,
  updateProduct,
} from "./../../../utils/products/products.utils";
import {
  getCategories,
  getSubFromCategory,
} from "./../../../utils/category/category.utils";

export const ProductUpdate = (props) => {
  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);
  const initialValues = {
    title: "",
    description: "",
    price: "",
    category: "",
    subcategory: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Silver", "White", "Blue", "Dark Grey"],
    brand: "",
    color: "",
  };
  const slug = props.match.params.slug;
  const [values, setValues] = useState(initialValues);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [arraySubcategory, setArraySubcategory] = useState();
  const user = useSelector((state) => state.user.currentUser);

  const loadProduct = async () => {
    await getOneProduct(slug, user.token)
      .then((res) => {
        setValues({ ...values, ...res.data });
        getSubFromCategory(res.data.category._id).then((res) => {
          setSubcategories(res.data);
        });
        let array = [];
        res.data.subcategory.forEach((sub) => array.push(sub._id));
        setArraySubcategory(array);
      })
      .catch((err) => console.log(err));
  };
  const loadCategories = async () => {
    await getCategories().then((res) => {
      setCategories(res.data);
    });
  };
  const handleChange = (e) => {
    console.log(values);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCatChange = async (e) => {
    setValues({ ...values, category: e.target.value });
    await getSubFromCategory(e.target.value)
      .then((res) => {
        setSubcategories(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleSubChange = (e) => {
    setArraySubcategory(e);
    setValues({ ...values, subcategory: arraySubcategory });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProduct(slug, user.token, values)
      .then((res) => {
        toast.success("Product created successfully");
        setValues(initialValues);
        loadProduct();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Product created failed");
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h3>Products Update Page</h3>
          <FileUploadForm values={values} setValues={setValues} />
          <ProductUpdateForm
            values={values}
            handleChange={handleChange}
            categories={categories}
            handleSubmit={handleSubmit}
            handleCatChange={handleCatChange}
            subcategories={subcategories}
            handleSubChange={handleSubChange}
            arraySubcategory={arraySubcategory}
          />
        </div>
      </div>
    </div>
  );
};
