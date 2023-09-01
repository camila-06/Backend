import fs from 'fs'
export default class CartManager {
    constructor(path){
        this.path = path;
        this.carts = [];
    }

    getCarts = async() => {
        try{
            if (fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, 'utf-8')
                const carts = JSON.parse(data)
                return carts
            }else{
                return this.carts
            }
        }
        catch (error){
            console.log(error)
        }
    }

    addCart = async (cart) => {
        try{
            const carts = await this.getCarts()
            if (carts.length === 0){
                cart.id = 1;
            } else {
                cart.id = carts[carts.length - 1].id + 1
            }
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"), 'utf-8')
            return cart
        }
        catch(error){
            console.log(error)
        }
    }

    getCartById = async (cartId) => {
        try{
            const carts = await this.getCarts();
            return carts.find((cart) => cart.id == cartId) ?? "Not found" 
        }
        catch(error){
            console.log(error)
        }
    }

    addProduct = async (cartId, productId, quantity) => {
        try{
            const carts = await this.getCarts();
            const idx = carts.findIndex(cart => cart.id == cartId)
            if (idx < 0) return 
            let foundProduct = false;
            carts[idx].products.forEach((p)=>{
                if (p.product == productId){
                    p.quantity += quantity;
                    foundProduct = true
                }
            })
            const newProduct = {
                product: productId,
                quantity: quantity
            }
            if (!foundProduct){
                carts[idx].products.push(newProduct);
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"), 'utf-8')
        }
        catch(error){
            console.log(error)
        }
    }
}