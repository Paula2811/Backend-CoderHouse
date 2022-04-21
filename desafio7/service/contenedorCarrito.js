const fs = require("fs");

class Carrito {
    constructor() {}

    carritos() {
        let contenido
        return JSON.parse(fs.readFileSync("carrito.txt", "utf-8"));
    }
    createCarrito() {
        let carrito = this.carritos() || [];
        if (carrito.length === 0) {
            carrito = [
                {   
                    id: carrito.length + 1,
                    timestamp: Date.now(),
                    productos: [],
                },
            ];
        } else {
            carrito.push(
                {
                    id: carrito.length + 1,
                    timestamp: Date.now(),
                    productos: [],
                });
        }
        try {
            fs.writeFileSync("carrito.txt", JSON.stringify(carrito, null, 4));
            return carrito[carrito.length - 1].id;
        } catch (error) {
            throw new Error("No se pudo crear el carrito");
        }
    }
    getCarrito(id) {
        return this.carritos().filter((carrito) => carrito.id === parseInt(id));
    }
    deleteCarrito(id) {
        let carrito = this.carritos().filter((carrito) => carrito.id !== parseInt(id));
        try {
            fs.writeFileSync("carrito.txt", JSON.stringify(carrito, null, 4));
            return carrito.id;
        } catch (error) {
            throw new Error("No se pudo elimianar el carrito");
        }
    }
    addProductInCarrito(id, producto) {
        let carrito = this.getCarrito(id);
        let timestamp = Date.now();
        let codigo = `${timestamp}/${carrito.length}`
        const nuevoProducto= {...producto, id: carrito.length, timestamp: timestamp, codigo: codigo}
        carrito[0].productos.push(nuevoProducto);
        try {
            fs.writeFileSync("carrito.txt", JSON.stringify(carrito, null, 4));
            return this.getCarrito(id);
        } catch (error) {
            throw new Error("No se agregar producto al carrito");
        }
    }
    
    deleteProductInCarrito(id, idProducto) {
        let carrito = this.getCarrito(id)
        let producto = carrito[0].productos.filter(producto => producto.id !== parseInt(idProducto))
        carrito.productos = producto
        try {
            fs.writeFileSync('carrito.txt', JSON.stringify(carrito, null, 4))
            return this.getCarrito(id)
        } catch (error) {
            throw new Error('No se pudo eliminar el producto del carrito')
        }
    }
}

module.exports = Carrito;
