import express from "express";

const app = express();
app.use(express.json());
const PORT = 3001;

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "iPhone X",
    },
  ];
  res.send(products);
});

app.listen(PORT, () => console.log(`Listening to Port ${PORT}`));
