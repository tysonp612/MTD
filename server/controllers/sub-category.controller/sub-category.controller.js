const SubCategory = require("../../models/sub-category.schema");
const slugify = require("slugify");
exports.createSubCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const subCategory = await new SubCategory({
      name: name,
      parent: parent,
      slug: slugify(name),
    }).save();
    res.status(200).json(subCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category failed");
  }
};
exports.getAllSubCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().sort({ createdAt: -1 });
    res.status(200).json(subCategories);
  } catch (err) {
    res.status(400);
  }
};
exports.getOneSubCategory = async (req, res) => {
  const slug = req.params.slug;
  try {
    const oneSubCategory = await SubCategory.findOne({ slug: slug });
    res.status(200).json(oneSubCategory);
  } catch (err) {
    res.status(400);
  }
};
exports.updateSubCategory = async (req, res) => {
  const slug = req.params.slug;
  const { name, parent } = req.body;
  try {
    const oneSubCategory = await SubCategory.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name), parent: parent },
      { new: true }
    );
    res.status(200).json(oneSubCategory);
  } catch (err) {
    res.status(400).send("Update sub category failed");
  }
};
exports.deleteSubCategory = async (req, res) => {
  try {
    const slug = req.params.slug;
    const deleteSubCategory = await SubCategory.findOneAndDelete({ slug });
    res.status(200).json(null);
  } catch (err) {
    console.log(err);
    res.status(400).send("Delete sub category failed");
  }
};
