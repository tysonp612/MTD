const Product = require("./../../models/product.schema");
const User = require("./../../models/user.schema");
const Category = require("./../../models/category.schema");
const SubCategory = require("./../../models/sub-category.schema");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
	try {
		req.body.slug = slugify(req.body.title);
		const product = await new Product(req.body).save();
		res.status(200).json(product);
	} catch (err) {
		console.log(err);
		res.status(400).send("Create product failed");
	}
};

exports.getAllProductFromCategory = async (req, res) => {
	try {
		const { slug } = req.params;
		const categoryObj = await Category.find({ slug });
		const categoryId = categoryObj[0]._id;
		const products = await Product.find({ category: categoryId })
			.populate("category")
			.populate("subcategory");
		res.status(200).json(products);
	} catch (err) {
		console.log(err);
		res.status(404).send("No product found");
	}
};
exports.getAllProductFromSubCategory = async (req, res) => {
	try {
		const { slug } = req.params;
		const subCategoryObj = await SubCategory.find({ slug });

		const subCategoryId = subCategoryObj[0]._id;

		const products = await Product.find({ subcategory: subCategoryId })
			.populate("category")
			.populate("subcategory");
		res.status(200).json(products);
	} catch (err) {
		console.log(err);
		res.status(404).send("No product found");
	}
};
exports.getAllProductsWithPagination = async (req, res) => {
	try {
		const { page } = req.body;
		const currentPage = page || 1;
		const documentPerPage = +req.params.count;

		const products = await Product.find()
			.skip((currentPage - 1) * documentPerPage)
			.limit(+req.params.count)
			.populate("category")
			.populate("subcategory")
			.sort({ createdAt: -1 });
		res.status(200).json(products);
	} catch (err) {
		console.log(err);
		res.status(404).send("No product found");
	}
};
//Note this
exports.getRelatedProducts = async (req, res) => {
	try {
		const { page, categoryId } = req.body;
		const currentPage = page || 1;
		const documentPerPage = 3;
		const { slug } = req.params;

		const allRelatedProducts = await Product.find({ category: categoryId })
			.skip((currentPage - 1) * documentPerPage)
			.populate("category")
			.populate("subcategory")
			.limit(documentPerPage);

		const relatedProducts = allRelatedProducts.filter(
			(product) => product.slug !== slug
		);

		res.status(200).json(relatedProducts);
	} catch (err) {
		console.log(err);
	}
};
exports.productsCountRelated = async (req, res) => {
	try {
		const { categoryId } = req.body;
		let totalProducts = await Product.find({
			category: categoryId,
		});
		let productQuantity = totalProducts.length;
		res.status(200).json(productQuantity - 1);
	} catch (err) {
		console.log(err);
	}
};
exports.getSortedProducts = async (req, res) => {
	//WITH PAGINATION
	try {
		const { sortBy, order, page } = req.body;
		const currentPage = page || 1;
		const documentPerPage = 3;
		const products = await Product.find()
			.skip((currentPage - 1) * documentPerPage)
			.populate("category")
			.populate("subcategory")
			.sort([[sortBy, order]])
			.limit(documentPerPage);
		res.status(200).json(products);
	} catch (err) {
		console.log(err);
	}
};
exports.getOneProduct = async (req, res) => {
	try {
		const slug = req.params.slug;
		const product = await Product.findOne({ slug: slug })
			.populate("category")
			.populate("subcategory");
		res.status(200).json(product);
	} catch (err) {
		console.log(err);
		res.status(404).send("No product found");
	}
};

exports.updateProduct = async (req, res) => {
	try {
		const slug = req.params.slug;
		const product = await Product.findOneAndUpdate(
			{ slug: slug },
			req.body.values,
			{
				new: true,
			}
		);
		res.status(200).json(product);
	} catch (err) {
		console.log(err);
		res.status(404).send("Update failed");
	}
};
exports.productsCount = async (req, res) => {
	try {
		let total = await Product.find().estimatedDocumentCount();
		res.status(200).json(total);
	} catch (err) {
		res
			.status(500)
			.json({ error: "An error occurred while fetching the product count" });
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		const slug = req.params.slug;
		await Product.findOneAndDelete({ slug: slug });
		res.status(200).json(null);
	} catch (err) {
		console.log(err);
		res.status(400).send("Delete product failed");
	}
};
exports.productStarRating = async (req, res) => {
	try {
		const id = req.params.productId;
		const product = await Product.findById(id);
		const user = await User.findOne({ email: req.user.email });
		const { star } = req.body;

		//Who is updating?
		//because ratings is an array, we will first find if there is any rating object inside that array which have the postedBy matches the user.id
		let ratingObject = product.ratings.find(
			(obj) =>
				obj.postedBy.valueOf().toString() === user._id.valueOf().toString()
		);

		if (ratingObject === undefined) {
			let ratingAdded = await Product.findByIdAndUpdate(
				id,
				{ $push: { ratings: { star: star, postedBy: user._id } } },
				{ new: true }
			);
			res.status(200);
		} else {
			let newRating = await Product.updateOne(
				{ _id: id, "ratings.postedBy": user._id },
				// { ratings: { $elemMatch: ratingObject } },

				// if (rating) {
				// // Update user's rating
				//  rating.star = star;
				//  product = await product.save({ validateBeforeSave: true });
				//  res.status(200).json({product});
				// ......
				{
					$set: { "ratings.$.star": star },
				},
				{ new: true }
			);
			res.status(200);
		}
		//Check if currently logged in user have already added rating to this product
	} catch (err) {
		console.log(err);
	}
};
//SEARCH/FILTER
// const handleQuery = async (req, res, query) => {
//   try {
//     const products = await Product.find({ $text: { $search: query } })
//       .populate("category", "_id name")
//       .populate("subcategory", "_id name")
//       .populate("ratings.postedBy", "_id name");
//     res.status(200).json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };
// exports.getProductsByFilters = async (req, res) => {
//   const { query } = req.body;
//   console.log(query);
//   if (query) {
//     console.log("query", query);
//     await handleQuery(req, res, query);
//   }
// };
//Note
exports.getProductsByAveRating = async (req, res) => {
	try {
		const test = await Product.aggregate([
			{ $unwind: "$ratings" },
			{
				$group: { _id: "$slug", avgRating: { $avg: "$ratings.star" } },
			},
		]);

		res.status(200).json(test);
	} catch (err) {
		console.log(err);
	}
};
