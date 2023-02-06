const express = require('express');
const ProductManager = require('./productManager');

const productManager = new ProductManager();
const app = express();

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getAllProducts();
  if (limit) {
    products = products.slice(0, limit);
  }
  res.json(products);
});

app.get('/products/:pid', (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = productManager.getProductById(pid);
  if (!product) {
    res.status(404).send('Product not found');
  } else {
    res.json(product);
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
