import fs from 'fs'

const path = '../files/products.json'

// Realizar una clase "ProductManager" que gestione un conjunto de productos
export default class ProductManager{
    constructor(path){
        this.path = path; // Debe contar con una variable this.path y debe recibir la ruta a trabajar desde el momento de generar su instancia
        this.products = []; // Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío
    }

    // Debe contar con un método "addProduct" el cual agregará un producto al arreglo de productos inicial
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        try{
            const products = await this.getProducts();

            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            if (products.length === 0){
                product.id = 1
            } else {
                product.id = products[products.length-1].id + 1
            }

            if ((title == undefined || title == "") || (description == undefined || description == "") || (price == undefined || price == "") || (thumbnail == undefined || thumbnail == "") || (code == undefined || code == "") || (stock == undefined || stock == "")){
                console.log("Error. Todos los campos son obligatorios")
            } else{
                const filter = products.some(product => product.code === code)
                if (!filter){
                    products.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(product, null, "\t"), 'utf-8')
                    return product
                }else {
                    console.log("Error, el código ingresado se encuentra repetido")
                }
            }
        }
        catch (error){
            console.log(error)
        }
    }

    // Debe contar con un método "getProducts" el cual debe devolver el arreglo con todos los productos creados hasta ese momento
    getProducts = async () => {
        try{
            if (fs.existsSync(path)){
                const data = await fs.promises.readFile(this.path, 'utf-8')
                const products = JSON.parse(data)
                return products
            }else{
                return this.products
            }
        }
        catch (error){
            console.log(error)
        }
    }

    // Debe contar con un método "getProductById" el cual debe buscar en el arreglo el producto que coincida con el id
    getProductById = async (id) => {
        try{
            const products = await this.getProducts();
            return products.find((product) => product.id == id) ?? "Not found" // En caso de no coincidir ningún id, mostrar en consola un error "Not found"
        }
        catch (error){
            console.log(error)
        }
    }

    // Debe tener un método "updateProduct", el cual debe recibir el id del producto a actualizar, así también como el campo a actualizar, y debe actualizar el producto que tenga ese id en el archivo.
    updateProduct = async (id, title, description, price, thumbnail, code, stock) =>{
        try{
            const products = await this.getProducts();
            const idx = products.findIndex(product => product.id === id)
            if (idx < 0) return 
            products[idx] = {id, title, description, price, thumbnail, code, stock}
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"), 'utf-8')
        }
        catch (error){
            console.log(error)
        }
    }

    // Debe tener un método "deleteProduct", el cual debe recibir un id y debe eliminar el producto que tenga ese id en el archivo.
    deleteProduct = async(id) =>{
        try{
            const products = await this.getProducts();
            const filter = products.filter(product => product.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(filter, null, "\t"), 'utf-8')
        }
        catch (error){
            console.log('Error al eliminar el producto')
        }
    }
}


