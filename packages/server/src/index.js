const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();

const http = require("http")
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server, {cors: {origin: "*"}})
global.io = io

module.exports = { io }

dotenv.config();

const PORT = process.env.PORT;
const { sequelize } = require("./lib/sequelize");
const {
  addressRoutes,
  categoryRoutes,
  productRoutes,
  transactionRoutes,
  userRoutes,
} = require("./routes");

// sequelize.sync({ alter: true }); 
// sintax diatas digunakan untuk mapping colom table untuk mencek dan update. jika sudah kita bisa commant agar tidak berat saat  running

app.use(cors());
cors: 
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/address", addressRoutes);
// app.use("/category", categoryRoutes);
// app.use("/product", productRoutes);
// app.use("/transaction", transactionRoutes);
app.use("/user", userRoutes);

app.use("/payment_images", express.static(`${__dirname}/public/payment_images`));
app.use("/product_images", express.static(`${__dirname}/public/product_images`));
app.use("/profile_pict", express.static(`${__dirname}/public/profile_pict`));
app.use("/recipes_images", express.static(`${__dirname}/public/recipes_images`));

app.get("/", (req, res) => {
  res.send("API is running");
});
//res.send bisa kepakai untuk di send jadi seperti db.json/ fake api

app.listen(PORT, () => {
  console.log("server is running in port " + PORT);
});
