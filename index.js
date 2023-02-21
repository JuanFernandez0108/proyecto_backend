const express = require('express');
const app = express();

// Configuramos el puerto
const PORT = process.env.PORT || 3000;

// Configuramos el middleware para analizar las solicitudes entrantes con JSON
app.use(express.json());

// Configuramos el middleware para analizar las solicitudes entrantes de datos de formulario
app.use(express.urlencoded({ extended: true }));

// Configuramos la ruta principal
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

// Configuramos la ruta de productos
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Configuramos la ruta del carrito
const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
