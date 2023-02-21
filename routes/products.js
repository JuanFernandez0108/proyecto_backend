const express = require('express');
const router = express.Router();
const { productos } = require('../db.json');

router.get('/', (req, res) => {
  res.json(productos);
});

router.get('/:id', (req, res) => {
  const product = productos.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(product);
});

module.exports = router;
