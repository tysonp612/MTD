import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { QuerySearchForm } from "./../../components/forms/querysearch-form.component";
import { ProductCard } from "./../../components/card/regular.product-card.component";
import { SliderComponent } from "./../../components/slider/slider.component";

import {
	getAllProductsByCount,
	productsCount,
	getProductsFromAverageRating,
} from "./../../utils/products/products.utils";
import { getSubCategories } from "./../../utils/sub-category/sub-category.utils";
import { getCategories } from "./../../utils/category/category.utils";
import { Pagination, Menu, Tag } from "antd";
import StarRatings from "react-star-ratings";
import {
	DollarOutlined,
	DownSquareOutlined,
	StarOutlined,
	TagsOutlined,
	BgColorsOutlined,
	DingdingOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;
export const ShopPage = () => {
	const [allProducts, setAllProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [showPagination, setShowPagination] = useState(true);
	const [productsQuantity, setProductsQuantity] = useState(0);
	const [products, setProducts] = useState([]);
	const [averageRatingProducts, setAverageRatingProducts] = useState();
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [star, setStar] = useState(0);
	const [defaultProducts, setDefaultProducts] = useState([]);
	const [colors, setColors] = useState([
		"Black",
		"Silver",
		"White",
		"Blue",
		"Dark Grey",
	]);
	const [shipping, setShipping] = useState(["Yes", "No"]);

	const query = useSelector((state) => state.query.query);
	const input = {
		min: 0,
		max: 5000,
		defaultValue: [0, 0],
	};

	const docPerPages = 9;
	useEffect(() => {
		renderQueryProduct();
	}, [query]);
	useEffect(() => {
		renderProductFromSlider();
		renderProductFromCategory();
		renderProductFromRating();
		renderProductFromSubCategory();
	}, [products]);
	useEffect(() => {
		loadProductsByCount();
	}, [page]);
	useEffect(() => {
		loadAllProducts();
		loadProductsCount();
		loadCategories();
		loadAverageRating();
		loadSubCategories();
	}, []);
	//METHOD
	const renderQueryProduct = () => {
		if (query && allProducts.length) {
			const queryProducts = allProducts.filter(
				(prod) =>
					prod.title.toLowerCase().includes(query.toLowerCase()) ||
					prod.description.toLowerCase().includes(query.toLowerCase())
			);
			setShowPagination(false);
			return setProducts(queryProducts);
		} else if (query === "") {
			setShowPagination(true);
			return setProducts(defaultProducts);
		}
	};

	//Note
	const renderProductFromRating = (star) => {
		if (star && averageRatingProducts) {
			setStar(star);
			//filter array of product fetched from db that equal star
			const productWithSameAvgRating = averageRatingProducts.filter(
				(prod) => Math.round(prod.avgRating) === star
			);

			const avgRatingProducts = productWithSameAvgRating.map((aprod) => {
				return allProducts.find((prod) => prod.slug === aprod._id);
			});
			setShowPagination(false);
			return setProducts(avgRatingProducts);
		}
	};

	const renderProductFromSlider = (value) => {
		if (value) {
			const silderProducts = allProducts.filter(
				(prod) => prod.price > value[0] && prod.price < value[1]
			);
			setShowPagination(false);
			return setProducts(silderProducts);
		}
	};
	const renderProductFromColors = (value) => {
		if (value) {
			const colorsProducts = allProducts.filter((prod) => prod.color === value);
			setShowPagination(false);
			return setProducts(colorsProducts);
		}
	};
	const renderProductFromShipping = (value) => {
		if (value) {
			const shippingProducts = allProducts.filter(
				(prod) => prod.shipping === value
			);
			setShowPagination(false);
			return setProducts(shippingProducts);
		}
	};
	const renderProductFromCategory = (id) => {
		if (id) {
			const categoryProducts = allProducts.filter(
				(prod) => prod.category._id === id
			);

			setShowPagination(false);
			return setProducts(categoryProducts);
		}
	};
	const renderProductFromSubCategory = (id) => {
		if (id) {
			const subCategoryProducts = allProducts.filter((prod) => {
				return prod.subcategory.find((sub) => sub._id === id.key);
			});
			setShowPagination(false);
			return setProducts(subCategoryProducts);
		}
	};
	const loadAverageRating = () => {
		getProductsFromAverageRating()
			.then((res) => {
				setAverageRatingProducts(res.data);
			})
			.catch((err) => console.log(err));
	};
	const loadProductsByCount = () => {
		getAllProductsByCount(docPerPages, page)
			.then((res) => {
				setProducts(res.data);
				setDefaultProducts(res.data);
			})
			.catch((err) => console.log(err));
	};
	const loadAllProducts = () => {
		getAllProductsByCount()
			.then((res) => {
				setAllProducts(res.data);
			})
			.catch((err) => console.log(err));
	};
	const loadProductsCount = () => {
		productsCount()
			.then((res) => {
				setProductsQuantity(res.data);
			})
			.catch((err) => console.log(err));
	};
	const loadCategories = () => {
		getCategories()
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => console.log(err));
	};
	const loadSubCategories = () => {
		getSubCategories()
			.then((res) => {
				setSubCategories(res.data);
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="row">
			<div className="col-md-3">
				<h4 className="p-3">Search/Filter</h4>
				<div className="p-2">
					<QuerySearchForm />
				</div>

				<hr />
				<Menu mode="inline" className="pl-2">
					<SubMenu
						key="sub1"
						title={
							<span className="d-flex h6">
								<DollarOutlined className="align-self-center" />
								<span>Price</span>
							</span>
						}
					>
						<Menu.Item key="1">
							<div className="p-3">
								<SliderComponent
									input={input}
									renderProductFromSlider={renderProductFromSlider}
								/>
							</div>
						</Menu.Item>
					</SubMenu>
					{categories && (
						<SubMenu
							key="sub2"
							title={
								<span className="d-flex h6">
									<DownSquareOutlined className="align-self-center" />
									<span>Categories</span>
								</span>
							}
						>
							{categories.map((category) => (
								<Menu.Item
									key={category._id}
									onClick={(e) => renderProductFromCategory(e.key)}
								>
									{category.name}
								</Menu.Item>
							))}
						</SubMenu>
					)}
					<SubMenu
						key="sub3"
						title={
							<span className="d-flex h6">
								<StarOutlined className="align-self-center" />
								<span>Rating</span>
							</span>
						}
					>
						<Menu.Item key="3" className="p-5">
							<StarRatings
								rating={star}
								starDimension="35px"
								starSpacing="2px"
								starRatedColor="red"
								changeRating={(e) => renderProductFromRating(e)}
							/>
						</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub4"
						title={
							<span className="d-flex h6">
								<TagsOutlined className="align-self-center" />
								<span>Sub Categories</span>
							</span>
						}
					>
						{subCategories.map((sub) => (
							<Menu.ItemGroup key={`g${sub._id}`} className="d-inline-block">
								<Menu.Item
									key={sub._id}
									onClick={(e) => renderProductFromSubCategory(e)}
									className="p-2"
								>
									<Tag className="p-2">{sub.name}</Tag>
								</Menu.Item>
							</Menu.ItemGroup>
						))}
					</SubMenu>
					<SubMenu
						key="sub5"
						title={
							<span className="d-flex h6">
								<BgColorsOutlined className="align-self-center" />
								<span>Colors</span>
							</span>
						}
					>
						{colors.map((color) => (
							<Menu.Item
								key={color}
								className="pl-5"
								onClick={(e) =>
									renderProductFromColors(e.domEvent.target.outerText)
								}
							>
								{color}
							</Menu.Item>
						))}
					</SubMenu>
					<SubMenu
						key="sub6"
						title={
							<span className="d-flex h6">
								<DingdingOutlined className="align-self-center" />
								<span>Shipping</span>
							</span>
						}
					>
						{shipping.map((ship) => (
							<Menu.Item
								key={ship}
								className="pl-5"
								onClick={(e) =>
									renderProductFromShipping(e.domEvent.target.outerText)
								}
							>
								{ship}
							</Menu.Item>
						))}
					</SubMenu>
				</Menu>
			</div>
			<div className="col-md-9 row pt-4">
				{products.length && allProducts.length ? (
					products.map((product) => (
						<div className="col-md-4" key={product._id}>
							<ProductCard product={product} />
						</div>
					))
				) : (
					<h3 className="text-center">No product found</h3>
				)}
				{products.length && showPagination ? (
					<Pagination
						className="text-center pt-3"
						current={page}
						total={Math.round((productsQuantity / docPerPages) * 10)}
						onChange={(value) => {
							setPage(value);
						}}
					/>
				) : (
					""
				)}
			</div>
		</div>
	);
};
