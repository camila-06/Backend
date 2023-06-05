// Realizar una clase "ProductManager" que gestione un conjunto de productos
class ProductManager{
    constructor(){
        this.products = []; // Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío
    }

    // Debe contar con un método "addProduct" el cual agregará un producto al arreglo de productos inicial
    addProduct = (title, description, price, thumbnail, code, stock) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        if (this.products.length === 0){
            product.id = 1
        } else {
            product.id = this.products[this.products.length-1].id + 1
        }

        if ((title == undefined || title == "") || (description == undefined || description == "") || (price == undefined || price == "") || (thumbnail == undefined || thumbnail == "") || (code == undefined || code == "") || (stock == undefined || code == "")){
            console.log("Error. Todos los campos son obligatorios")
        } else{
            const filter = this.products.some(product => product.code === code)
        if (!filter){
            this.products.push(product)
        }else {
            console.log("Error, el código ingresado se encuentra repetido")
        }
        }
    }

    // Debe contar con un método "getProducts" el cual debe devolver el arreglo con todos los productos creados hasta ese momento
    getProducts = () => {
        return this.products;
    }

    // Debe contar con un método "getProductById" el cual debe buscar en el arreglo el producto que coincida con el id
    getProductById = (id) => {
        return this.products.find((product) => product.id == id) ?? "Not found" // En caso de no coincidir ningún id, mostrar en consola un error "Not found"
    }
}


const productManager = new ProductManager()
    console.log("\n", "* Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []")
    console.log(productManager.getProducts())

    productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
    console.log("\n", "* Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado")
    console.log(productManager.getProducts())

    console.log("\n", "* Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.")
    productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)

    console.log("\n", "* Validar que todos los campos sean obligatorios")
    productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "", 76)
    productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen")
    productManager.addProduct('producto prueba 2', 'Este es otro producto prueba', 100, 'Sin imagen', 'abc124', 20)

    console.log("\n", "* Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo")
    console.log(productManager.getProductById(1));
    console.log(productManager.getProductById(2));
    console.log(productManager.getProductById(8));

    console.log("\n", productManager.getProducts());