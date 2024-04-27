const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
