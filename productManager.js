class ProductManager {
    constructor() {
        this.products = [];
        this.idCounter = 0;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son requeridos");
            return;
        }

        if (this.products.find(product => product.code === code)) {
            console.log("El codigo ya existe");
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
    }

    getProduct(code) {
        return this.products.find(product => product.code === code);
    }

    getProductById(id) {
        let product = this.products.find(product => product.id === id);
        if (!product) {
            console.log("No fue encontrado");
        }
        return product;
    }

    getAllProducts() {
        return this.products;
    }
}

module.exports = ProductManager;
