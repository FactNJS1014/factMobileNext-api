const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const UserController = require("./controllers/UserController");
const CompanyController = require("./controllers/CompanyController");
const ProductController = require("./controllers/ProductController");
const SellController = require("./controllers/SellController");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//UserController
app.post("/api/signin", UserController.signIn);
app.get("/api/user/info", UserController.info);
app.put("/api/user/update", UserController.update);

//CompanyController
app.post("/api/company/create", CompanyController.create);
app.get("/api/company/list", CompanyController.list);

//ProductController
app.post("/api/buy/create", ProductController.create);
app.get("/api/buy/list", ProductController.list);
app.put("/api/buy/update/:id", ProductController.update);
app.delete("/api/buy/delete/:id", ProductController.remove);

//SellController
app.post("/api/sell/add", SellController.create);
app.get("/api/sell/list", SellController.list);
app.delete("/api/sell/delete/:id", SellController.remove);
app.post("/api/sell/confirm", SellController.confirm);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
