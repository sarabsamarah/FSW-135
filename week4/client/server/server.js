const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressJwt = require("express-jwt");
require("dotenv").config();

mongoose.connect(
  "mongodb://localhost:27017/inventorydb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log("Connected to the DB")
);

app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", require("./routes/authRouter"));
app.use(
  "/api",
  expressJwt({ secret: process.env.secret, algorithms: ["HS256"] })
);
app.use("/api/issue", require("./routes/issueRouter.js"));
app.use("/api/comment", require("./routes/commentRouter.js"));
app.use("/api/user", require("./routes/userRouter.js"));

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "Unauthorized Error") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});

app.listen(9000, () => {
  console.log("Server is running on LocalHost:9000");
});