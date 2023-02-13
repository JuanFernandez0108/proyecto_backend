const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const router = express.Router();


const app = express();
const productsPath = './products.json';
const cartsPath = './carts.json';

app.use(express.json());

// Funcion para cargar los productos desde el archivo
const loadProducts = () => {
  try {
    const data = fs.readFileSync(productsPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Funcion para guardar los productos en el archivo
const saveProducts = (products) => {
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
};

// Funcion para cargar los carritos desde el archivo
const loadCarts = () => {
  try {
    const data = fs.readFileSync(cartsPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Funcion para guardar los carritos en el archivo
const saveCarts = (carts) => {
  fs.writeFileSync(cartsPath, JSON.stringify(carts, null, 2));
};

// Obtiene todos los productos
app.get('/api/products/', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 0;
  const products = loadProducts();

  if (limit) {
    res.send(products.slice(0, limit));
  } else {
    res.send(products);
  }
});

// Obtiene un producto por su id
app.get('/api/products/:id', (req, res) => {
  const products = loadProducts();
  const product = products.find((p) => p.id === req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

// Agrega un nuevo producto
app.post('/api/products/', (req, res) => {
  const products = loadProducts();
  const product = req.body;

  product.id = uuid.v4();
  product.status = true;

  products.push(product);
  saveProducts(products);

  res.send(product);
});

// Actualiza un producto por su id
app.put("/:pid", async (req, res) => {
    try {
    const pid = req.params.pid;
    const productToUpdate = req.body;
    const products = await readFile(PRODUCTS_FILE);
    const updatedProducts = products.map((product) => {
    if (product.id === pid) {
    return { ...product, ...productToUpdate };
    }
    return product;
    });
    await writeFile(PRODUCTS_FILE, updatedProducts);
    res.send("Producto actualizado");
    } catch (error) {
    res.status(500).send(error);
    }
    });
    
    // Elimina un producto por su id
    app.delete("/:pid", async (req, res) => {
    try {
    const pid = req.params.pid;
    const products = await readFile(PRODUCTS_FILE);
    const updatedProducts = products.filter((product) => product.id !== pid);
    await writeFile(PRODUCTS_FILE, updatedProducts);
    res.send("Producto eliminado");
    } catch (error) {
    res.status(500).send(error);
    }
    });
    
    // Crea un carrito
    app.post("/", async (req, res) => {
    try {
    const carts = await readFile(CARTS_FILE);
    const newCart = {
    id: generateId(),
    products: [],
    };
    carts.push(newCart);
    await writeFile(CARTS_FILE, carts);
    res.send("Carrito creado");
    } catch (error) {
    res.status(500).send(error);
    }
    });
    
    // Muestra los productos de un carrito por su id
    app.get("/:cid", async (req, res) => {
    try {
    const cid = req.params.cid;
    const carts = await readFile(CARTS_FILE);
    const cart = carts.find((c) => c.id === cid);
    if (!cart) {
    return res.status(404).send("Carrito no encontrado");
    }
    res.send(cart.products);
    } catch (error) {
    res.status(500).send(error);
    }
    });

// Agrega un producto a un carrito por su id
router.post('/:cid/product/:pid', async (req, res) => {
    try {
    // Obtiene el carrito
    const carts = await readFile(cartsPath);
    const cart = carts.find(c => c.id === req.params.cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');
    // Obtiene el producto
const products = await readFile(productsPath);
const product = products.find(p => p.id === req.params.pid);
if (!product) return res.status(404).send('Producto no encontrado');

// Verifica si el producto ya está en el carrito
const itemIndex = cart.products.findIndex(i => i.product === req.params.pid);
if (itemIndex === -1) {
  // Agrega el producto al carrito
  cart.products.push({ product: req.params.pid, quantity: 1 });
} else {
  // Incrementa la cantidad del producto
  cart.products[itemIndex].quantity++;
}

// Escribe la información actualizada del carrito
await writeFile(cartsPath, carts);

// Regresa el carrito actualizado
res.send(cart);
} catch (error) {
    res.status(500).send(error);
    }
    });
    
    // Elimina un carrito por su id
    router.delete('/:cid', async (req, res) => {
    try {
    // Obtiene los carritos
    const carts = await readFile(cartsPath);
    // Verifica si el carrito existe
const index = carts.findIndex(c => c.id === req.params.cid);
if (index === -1) return res.status(404).send('Carrito no encontrado');

// Elimina el carrito
carts.splice(index, 1);

// Escribe la información actualizada de los carritos
await writeFile(cartsPath, carts);

// Regresa un mensaje de éxito
res.send('Carrito eliminado');
} catch (error) {
    res.status(500).send(error);
    }
    });
    
    module.exports = router;