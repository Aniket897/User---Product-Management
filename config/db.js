const mongoose = require("mongoose");

exports.connectMongoose = () => {
    const url = "mongodb://localhost:27017";
    
  mongoose
    .connect(url, {
      dbName: "userAndProductManagmanets",
    })
    .then(() => {
      console.log("mongoose connected");
    })
    .catch((e) => {
      console.log("failed to connect mangoose ", e);
    });
};
