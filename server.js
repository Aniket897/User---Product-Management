const express = require("express");
const { connectMongoose } = require("./config/db");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const port = 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(port, () => {
  console.log("server started on port", port);
  connectMongoose();
});
