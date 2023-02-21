const express = require('express');
const router = express.Router();
const { carritos } = require('../db.json');

router.get('/', (req, res) => {
  res.json(carritos);
});

router.get('/:id', (req, res) => {
  const cart = carritos.find((c) => c.id === parseInt(req.params.id));
  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }
  res.json(cart);
});

module.exports = router;
