const fs = require('fs');

class ProductManager {
    constructor() {
        this.filePath = 'products.json';
        this.idCounter = 0;
        this.loadData();
    }

    loadData() {
        try {
            this.products = JSON.parse(fs.readFileSync(this.filePath));
            this.idCounter = this.products.length;
        } catch (error) {
            this.products = [];
        }
    }

    saveData() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.products));
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("All fields are required");
            return;
        }

        if (this.products.find(product => product.code === code)) {
            console.log("Code already exists");
            return;
        }

        let product = {
            id: this.idCounter++,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }
        this.products.push(product);
        this.saveData();
    }

    getProduct(code) {
        return this.products.find(product => product.code === code);
    }

    getProductById(id) {
        let product = this.products.find(product => product.id === id);
        if (!product) {
            console.log("Not found");
        }
        return product;
    }

    getAllProducts() {
        return this.products;
    }

    updateProduct(id, title, description, price, thumbnail, code, stock) {
        let product = this.getProductById(id);
        if (!product) {
            console.log("Not found");
            return;
        }

        if (title) product.title = title;
        if (description) product.description = description;
        if (price) product.price = price;
        if (thumbnail) product.thumbnail = thumbnail;
        if (code) product.code = code;
        if (stock) product.stock = stock;
        this.saveData();
    }

    deleteProduct(id) {
        let index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            console.log("Not found");
            return;
        }
        this.products.splice(index, 1);
        this.saveData();
    }
}

module.exports = ProductManager;
