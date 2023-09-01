import productModel from "../models/products.model.js"

export default class ProductManager{

    getProducts = async () => {
        try {
            const products = await productModel.find().lean();
            return products
        } catch (error) {
            console.log(error)
        }
    }


    getProductById = async (id) => {
        try {
            const products = await productModel.findById(id)
            return products
        } catch (error) {
            console.log(error)
        }
    }

    addProduct = async (newProduct) => {
        try {
            await productModel.create(newProduct);
            return newProduct
        }
        catch (error) {
            console.log(error)
        }
    }

    updateProduct = async (id, product) => {
        try {
            await productModel.findByIdAndUpdate(id, product);
            return product
        } catch (error) {
            console.log(error)
        }
    }
    
    deleteProduct = async (id) => {
        try {
            const productDeleted = await productModel.findByIdAndDelete(id);
            return productDeleted
        } catch (error) {
            console.log('Error deleting product')
        }
    }
}