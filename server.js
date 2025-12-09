const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const UserController = require("./controllers/UserController");
const CompanyController = require("./controllers/CompanyController");
const ProductController = require("./controllers/ProductController");
const SellController = require("./controllers/SellController");
const ServiceController = require("./controllers/ServiceController");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/upload", express.static("upload"));

//UserController
app.post("/api/signin", UserController.signIn);
app.get("/api/user/info", UserController.info);
app.put("/api/user/update", UserController.update);
app.get("/api/user/list", UserController.list);
app.post("/api/user/create", UserController.create);
app.put("/api/user/update/:id", UserController.updateRow);
app.delete("/api/user/delete/:id", UserController.remove);

//CompanyController
app.post("/api/company/create", CompanyController.create);
app.get("/api/company/list", CompanyController.list);

//ProductController
app.post("/api/buy/create", ProductController.create);
app.get("/api/buy/list/:page", ProductController.list);
app.put("/api/buy/update/:id", ProductController.update);
app.delete("/api/buy/delete/:id", ProductController.remove);
app.post("/api/buy/export", ProductController.exportToExcel);

//SellController
app.post("/api/sell/add", SellController.create);
app.get("/api/sell/list", SellController.list);
app.delete("/api/sell/delete/:id", SellController.remove);
app.post("/api/sell/confirm", SellController.confirm);
app.get("/api/sell/dashboard/:year", SellController.dashboard);
app.get("/api/sell/history", SellController.history);
app.get("/api/sell/info/:id", SellController.info);

//ServiceController
app.post("/api/service/create", ServiceController.create);
app.get("/api/service/list", ServiceController.list);
app.put("/api/service/update/:id", ServiceController.update);
app.delete("/api/service/remove/:id", ServiceController.remove);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
