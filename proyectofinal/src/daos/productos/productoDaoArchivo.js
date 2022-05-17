import ContenedorArchivo from "../../contenedores/ContenedorArchivo";

class ProductosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('./DB/productos.json')
    }
}

export default ProductosDaoArchivo