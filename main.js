const ProductManager = require('./productManager');

let productManager = new ProductManager();
productManager.addProduct('Product 1', 'Description 1', 10, 'thumbnail1.jpg', 'code1', 10);
productManager.addProduct('Product 2', 'Description 2', 20, 'thumbnail2.jpg', 'code2', 20);
productManager.addProduct('Product 3', 'Description 3', 30, 'thumbnail3.jpg', 'code3', 30);

let products = productManager.getAllProducts();
console.log(products);

let product = productManager.getProductById(1);
console.log(product);

productManager.updateProduct(1, 'Updated Product 1', 'Updated Description 1', 15, 'thumbnail1.jpg', 'code1', 15);
product = productManager.getProductById(1);
console.log(product);

productManager.deleteProduct(2);
products = productManager.getAllProducts();
console.log(products);
