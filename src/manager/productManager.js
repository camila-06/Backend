import fs from 'fs'
export default class ProductManager{
    constructor(path){
        this.path = path; 
        this.products = [];
    }

    getProducts = async () => {
        try{
            if (fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8')
                const products = JSON.parse(data)
                return products
            } else {
                return this.products
            }
        }
        catch (error){
            console.log(error)
        }
    }

    getProductById = async (id) => {
        try{
            const products = await this.getProducts();
            return products.find((product) => product.id == id) ?? "Not found" 
        }
        catch (error){
            console.log(error)
        }
    }
    
    addProduct = async (newProduct) => {
        try{
            newProduct.status = true;
            const products = await this.getProducts();

            if (products.length === 0){
                newProduct.id = 1
            } else {
                newProduct.id = products[products.length-1].id + 1
            }

            if ((newProduct.title == undefined || newProduct.title == "") || (newProduct.description == undefined || newProduct.description == "") || (newProduct.price == undefined || newProduct.price == "") || (newProduct.code == undefined || newProduct.code == "") || (newProduct.stock == undefined || newProduct.stock == "")){
                console.log("Error. Incomplete values")
            } else{
                const filter = products.some(product => product.code === newProduct.code)
                if (!filter){
                    products.push(newProduct)
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"), 'utf-8')
                    return newProduct
                }else {
                    console.log("Error, the code entered is repeated")
                }
            }
        }
        catch (error){
            console.log(error)
        }
    }

    updateProduct = async (id, title, description, code, price, stock, category, status) =>{
        try{
            const products = await this.getProducts();
            const idx = products.findIndex(product => product.id === id)
            if (idx < 0) return 
            products[idx] = {id, title, description, code, price, stock, category, status}
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"), 'utf-8')
        }
        catch (error){
            console.log(error)
        }
    }

    deleteProduct = async(id) =>{
        try{
            const products = await this.getProducts();
            const filter = products.filter(product => product.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(filter, null, "\t"), 'utf-8')
        }
        catch (error){
            console.log('Error deleting product')
        }
    }
}

