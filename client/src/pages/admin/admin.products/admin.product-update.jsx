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
import { useParams } from "react-router-dom";

export const ProductUpdate = () => {
	// Get slug parameter from the URL
	const { slug } = useParams();

	// Get current user from Redux state
	const user = useSelector((state) => state.user.currentUser);

	// State to manage form data
	const [values, setValues] = useState({
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
	});

	// State to manage categories
	const [categories, setCategories] = useState([]);

	// State to manage subcategories
	const [subcategories, setSubcategories] = useState([]);

	// State to manage array of subcategories
	const [arraySubcategory, setArraySubcategory] = useState([]);

	// Load product data and categories on component mount
	useEffect(() => {
		loadProduct();
		loadCategories();
	}, []);

	// Function to load product data
	const loadProduct = async () => {
		try {
			// Fetch product data based on slug and user token
			const res = await getOneProduct(slug, user.token);
			// Update form values with fetched product data
			setValues({ ...values, ...res.data });
			// Fetch subcategories based on product category
			const subRes = await getSubFromCategory(res.data.category._id);
			// Update subcategories state with fetched data
			setSubcategories(subRes.data);
			// Extract subcategory IDs and update arraySubcategory state
			let array = [];
			res.data.subcategory.forEach((sub) => array.push(sub._id));
			setArraySubcategory(array);
		} catch (error) {
			console.error("Error loading product:", error);
		}
	};

	// Function to load categories
	const loadCategories = async () => {
		try {
			// Fetch all categories
			const res = await getCategories();
			// Update categories state with fetched data
			setCategories(res.data);
		} catch (error) {
			console.error("Error loading categories:", error);
		}
	};

	// Event handler for form input changes
	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	// Event handler for category selection change
	const handleCatChange = async (e) => {
		setValues({ ...values, category: e.target.value });
		try {
			// Fetch subcategories based on selected category
			const res = await getSubFromCategory(e.target.value);
			// Update subcategories state with fetched data
			setSubcategories(res.data);
		} catch (error) {
			console.error("Error loading subcategories:", error);
		}
	};

	// Event handler for subcategory selection change
	const handleSubChange = (e) => {
		// Update arraySubcategory state with selected subcategories
		setArraySubcategory(e);
		setValues({ ...values, subcategory: e });
	};

	// Event handler for form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Update product data using API call with updated form values
			const res = await updateProduct(slug, user.token, values);
			// Display success message
			toast.success("Product updated successfully");
			// Clear form values and reload product data
			setValues({
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
			});
			loadProduct();
		} catch (error) {
			console.error("Error updating product:", error);
			// Display error message
			toast.error("Product update failed");
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					{/* Render admin navigation component */}
					<AdminNav />
				</div>
				<div className="col-md-10">
					<h3>Products Update Page</h3>
					{/* Render file upload form */}
					<FileUploadForm values={values} setValues={setValues} />
					{/* Render product update form */}
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
