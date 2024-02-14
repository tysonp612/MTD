const Category = require("./../../models/category.schema");
const SubCategory = require("./../../models/sub-category.schema");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({
      name: name,
      slug: slugify(name),
    }).save();
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category failed");
  }
};
exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(400);
  }
};
exports.getOneCategory = async (req, res) => {
  const slug = req.params.slug;
  try {
    const oneCategory = await Category.findOne({ slug: slug });
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(400);
  }
};
exports.updateCategory = async (req, res) => {
  const slug = req.params.slug;
  const { name } = req.body;
  try {
    const oneCategory = await Category.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(400).send("Update category failed");
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const slug = req.params.slug;
    const deleteCategory = await Category.findOneAndDelete({ slug });
    res.status(200).json(null);
  } catch (err) {
    console.log(err);
    res.status(400).send("Delete category failed");
  }
};
exports.getSubFromCategoryId = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ parent: req.params.id });
    res.status(200).json(subCategories);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .send("Could not find subcategory matches with provided category");
  }
};
