const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "A sub category must have a name"],
      minlength: [2, "Name characters must be higher than 2"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    parent: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;
