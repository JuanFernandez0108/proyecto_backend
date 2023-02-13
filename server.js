const express = require("express");
const app = express();
const productRoutes = require('./routes/products');
const cartsRouter = require("./routes/carts");

app.use(express.json());
app.use('/products', productRoutes);
app.use("/api/carts", cartsRouter);

const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
