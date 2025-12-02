const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const UserController = require("./controllers/UserController");
const CompanyController = require("./controllers/CompanyController");
const ProductController = require("./controllers/ProductController");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//UserController
app.post("/api/signin", UserController.signIn);

//CompanyController
app.post("/api/company/create", CompanyController.create);
app.get("/api/company/list", CompanyController.list);

//ProductController
app.post("/api/buy/create", ProductController.create);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});