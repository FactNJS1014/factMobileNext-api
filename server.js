const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const UserController = require("./controllers/UserController");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//UserController
app.post("/api/signin", UserController.signIn);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});