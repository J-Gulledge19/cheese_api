// DEPENDENCIES
require("dotenv").config();
const { PORT = 3000, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// Import middlware
const cors = require("cors");
const morgan = require("morgan");

// DATABASE CONNECTION

// Establish Connection
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

// MODELS

const CheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String
});

const Cheese = mongoose.model("Cheese", CheeseSchema);

// MiddleWare

app.use(cors());
app.use(morgan("dev")); 
app.use(express.json()); 

// ROUTES

app.get("/", (req, res) => {
  res.send("hello world");
});

// INDEX ROUTE
app.get("/cheese", async (req, res) => {
  try {
    res.json(await Cheese.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// CREATE ROUTE
app.post("/cheese", async (req, res) => {
  try {
    res.json(await Cheese.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update ROUTE
app.put("/cheese/:id", async (req, res) => {
  try {
    res.json(
      await Cheese.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete ROUTE
app.delete("/cheese/:id", async (req, res) => {
  try {
    res.json(await Cheese.findByIdAndRemove(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

// INDEX ROUTE
app.get("/cheese/:id", async (req, res) => {
    try {
      res.json(await Cheese.findById(req.params.id));
    } catch (error) {
      res.status(400).json(error);
    }
  });

// LISTENER

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));