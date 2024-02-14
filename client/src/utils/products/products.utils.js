import axios from "axios";

export const updateStarRating = async (productId, authToken, star) => {
	return await axios.put(
		`${process.env.REACT_APP_API}/product/star/${productId}`,
		{
			star,
		},
		{
			headers: { authToken },
		}
	);
};
export const productsCount = async () => {
	return await axios.get(`${process.env.REACT_APP_API}/products/total`);
};
export const relatedProductsCount = async (categoryId) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/products/related/total`,
		{
			categoryId,
		}
	);
};

export const getAllProductsByCount = async (count, page) => {
	return await axios.post(`${process.env.REACT_APP_API}/products/${count}`, {
		page,
	});
};
export const createProducts = async (values, authToken) => {
	return await axios.post(`${process.env.REACT_APP_API}/product`, values, {
		headers: { authToken },
	});
};
export const getSortedProducts = async (sortBy, order, page) => {
	return await axios.post(`${process.env.REACT_APP_API}/products`, {
		sortBy,
		order,
		page,
	});
};
export const getOneProduct = async (slug) => {
	return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};
export const updateProduct = async (slug, authToken, values) => {
	return await axios.put(
		`${process.env.REACT_APP_API}/product/${slug}`,
		{ values },
		{
			headers: { authToken },
		}
	);
};
export const deleteProduct = async (slug, authToken) => {
	return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
		headers: { authToken },
	});
};

export const getRelatedProducts = async (slug, categoryId, page) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/products/related/${slug}`,
		{
			categoryId,
			page,
		}
	);
};

export const getProductFromCategory = async (slug) => {
	return await axios.get(
		`${process.env.REACT_APP_API}/products/from-category/${slug}`
	);
};
export const getProductFromSubCategory = async (slug) => {
	return await axios.get(
		`${process.env.REACT_APP_API}/products/from-subcategory/${slug}`
	);
};

export const getProductsFromQuery = async (query) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/products/search/filters`,
		{
			query,
		}
	);
};
export const getProductsFromAverageRating = async (query) => {
	return await axios.get(
		`${process.env.REACT_APP_API}/products/search/average-rating`
	);
};
