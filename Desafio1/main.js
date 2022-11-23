class ProductManager{
    constructor(){
        this.products = []
    }

    getProducts = () => {
        return this.products
    }

    getNextID = () => {
        const count = this.products.length

        if (count > 0) {
            const lastProduct = this.products[count-1]
            const id = lastProduct.id + 1
            return id
        } else {
            return 1
        }
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const id = this.getNextID()
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id
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

    getProductById = (id) => {
        return this.products.find((product) => product.id == id) ?? "Not Found"
    }
}
const productManager = new ProductManager()
    console.log("\n", "* Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []")
    console.log(productManager.getProducts())

    productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
    console.log("\n", "* Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado")
    console.log(productManager.getProducts())

    console.log("\n", "* Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.")
    productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)

    console.log("\n", "* Validar que todos los campos sean obligatorios")
    productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "", 76)
    productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen")

    console.log("\n", "* Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo")
    console.log(productManager.getProductById(1))
    console.log(productManager.getProductById(2))
    console.log(productManager.getProductById(8))

    console.log("\n", productManager.getProducts())