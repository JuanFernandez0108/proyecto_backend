const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor() {
    this.products = [];
    this.filePath = path.join(__dirname, 'products.json');
    this.loadData();
  }

  loadData() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  }

  saveData() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.products));
    } catch (error) {
      console.error(error);
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 0;
    this.products.push({
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    });
    this.saveData();
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    id = Number(id);
    return this.products.find(product => product.id === id);
  }
  

  updateProduct(id, title, description, price, thumbnail, code, stock) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
      this.saveData();
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveData();
      return true;
    }
    return false;
  }
}

module.exports = ProductManager;
