const Product = require("./../../models/product.schema");
const cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.uploadImages = async (req, res) => {
	try {
		let result = await cloudinary.uploader.upload(req.body.images, {
			public_id: `${Date.now()}`,
			resource_type: "auto",
		});
		res.status(200).json({
			public_id: result.public_id,
			url: result.secure_url,
		});
	} catch (err) {
		console.error("Cloudinary error:", err);
		res
			.status(500)
			.json({ error: "Failed to upload image", details: err.message });
	}
};
exports.removeImages = async (req, res) => {
	let image_id = req.body.public_id;

	try {
		await cloudinary.uploader.destroy(image_id);
		res.status(200).send("image deleted");
	} catch (err) {
		console.log(err);
	}
};
