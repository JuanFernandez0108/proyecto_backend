const ProductManager = require('./productManager');

let productManager = new ProductManager();
productManager.addProduct('Product 1', 'Description 1', 500, 'img-thumbnail1.jpg', '1010', 10);
productManager.addProduct('Product 2', 'Description 2', 1000, 'img-thumbnail2.jpg', '555', 5);
productManager.addProduct('Product 3', 'Description 3', 2000, 'img-thumbnail3.jpg', '1515', 15);

console.log(productManager.getAllProducts());
console.log(productManager.getProductById(0));
console.log(productManager.getProduct('1010'));
