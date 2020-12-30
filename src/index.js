import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const Product = mongoose.model("Product", {
  name: { type: String, require: true },
  price: { type: Number, require: true },
});

app.get("/api/products/:id", async (req, res) => {
  const products = await Product.findById(req.params.id);
  res.send(products);
});
app.post("api/products/", async (req, res) => {
  const { name, price } = req.body;
  const product = new Product({ name, price });
  const result = await product.save();
  res.send(result);
});
app.put("/api/products/:id", async (req, res) => {
  const body = {
    name: req.body.name,
    price: req.body.price,
  };
  const product = await Product.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });
  res.send(product);
});

app.delete("/api/products/:id", async (req, res) => {
  const result = await Product.findByIdAndRemove(req.params.id);
  res.send(result);
});
const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/lazadaDB", {
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log("Could not connect to MongoDB...");
  }
};
connectToDB();

app.listen(3001, () => console.log(`Listening to Port 3001`));
