const userModel = require("../models/user.model");
const userRouter = require("express").Router();

userRouter.post("/", async (req, resp) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return resp.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return resp.status(400).json({
        message: "user already exist",
      });
    }

    const newUser = await userModel.create({ username, email, password });

    resp.status(200).json({
      message: "user created successfully",
      user: newUser,
    });
  } catch (error) {
    resp.status(500).json({
      message: "Internal server error",
    });
  }
});

userRouter.get("/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    if (!id) {
      return resp.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await userModel.findById(id);

    if (!user) {
      return resp.status(400).json({
        message: "user not exist",
      });
    }

    resp.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    resp.send(500).json({
      message: "Internal server error",
    });
  }
});

userRouter.delete("/:id", async (req, resp) => {
  try {
    const { id } = req.params;
    if (!id) {
      return resp.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await userModel.findByIdAndDelete(id);

    if (!user) {
      return resp.status(400).json({
        message: "user not exist",
      });
    }

    resp.status(200).json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    resp.status(500).json({
      message: "Internal server error",
    });
  }
});

userRouter.patch("/:id", async (req, resp) => {
  try {
    const { email, username, password } = req.body;
    const { id } = req.params;

    const updatedUser = await userModel.findByIdAndUpdate(id, {
      email,
      password,
      username,
    });

    resp.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    resp.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
});

module.exports = userRouter;
