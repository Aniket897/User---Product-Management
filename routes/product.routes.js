const productModel = require("../models/product.model");
const productRouter = require("express").Router();

productRouter.post("/", async (req, resp) => {
  try {
    const { name, category, price } = req.body;
    if (!name || !category || !price) {
      return resp.status(400).json({
        message: "All fields are required",
      });
    }

    const product = await productModel.create({ name, category, price });

    resp.status(200).json({
      message: "product created successfully",
      product,
    });
  } catch (error) {
    resp.status(500).json({
      message: "Internal server error",
      error,
    });
  }
});

productRouter.get("/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    if (!id) {
      return resp.status(400).json({
        message: "All fields are required",
      });
    }

    const product = await productModel.findById(id);

    if (!product) {
      return resp.status(400).json({
        message: "product not found",
      });
    }

    resp.status(200).json({
      message: "produt fetched successfully",
      product,
    });
  } catch (error) {
    resp.send(500).json({
      message: "Internal server error",
    });
  }
});

productRouter.delete("/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    if (!id) {
      return resp.status(400).json({
        message: "All fields are required",
      });
    }

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return resp.status(400).json({
        message: "product not found",
      });
    }

    resp.status(200).json({
      message: "product deleted successfully",
      product,
    });
  } catch (error) {
    resp.status(500).json({
      message: "Internal server error",
    });
  }
});

productRouter.patch("/:id", async (req, resp) => {
  try {
    const { name, category, price } = req.body;
    const { id } = req.params;

    const product = await productModel.findByIdAndUpdate(id, {
      name,
      category,
      price,
    });

    resp.status(200).json({
      message: "product updated successfully",
    });
  } catch (error) {
    resp.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
});

module.exports = productRouter;
