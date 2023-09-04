import cartModel from "../models/carts.model.js";

class CartManager {

    getCarts = async () => {
        try{
            const carts = await cartModel.find();
            return carts;
        }catch(error){
            console.error('Error', error.message)
            return []
        }
    }

    addCart = async (newCart) => {
        try {
            let cartData = {}
            if (newCart && newCart.length > 0){
                cartData.newCart = newCart;
            }
            const cart = await cartModel.create(cartData)
            return cart;
        } catch (error) {
            console.error('Error', error.message);
            return error
        }
    }

    getCartById = async (cartId) => {
        try {
            const cart = await cartModel.find({_id: cartId});
            return cart;
        } catch (error) {
            console.log(error)
        }
    }

    addProduct = async (cartId, productId, quantity) => {
        try {
            const filter = {_id: cartId, 'products.product': productId};
            const cart = await cartModel.findById(cartId);
            const findProduct = cart.products.some((product)=> product.product.toString() === productId);

            if (findProduct){
                const update = {$inc: {'products.$.quantity': quantity}}
                await cartModel.updateOne(filter, update);
            }else{
                const update = {$push: {products: {product: productId, quantity: quantity}}};
                await cartModel.updateOne({_id: cartId}, update);
            }
            return await cartModel.findById(cartId);
        } catch (error) {
            console.error('Error', error.message)
            return error
        }
    }

    updateCart = async (cartId, products) => {
        try {
            const cart = await cartModel.findById(cartId)
            cart.products = products
            await cartModel.findByIdAndUpdate(cartId, cart);
            return console.log('Cart updated', cart)
        } catch (error) {
            console.error('Error', error.message)
            return error
        }
    }

    updateProduct = async (cartId, productId, quantity) => {
        try {
            const filter = {_id: cartId, 'products.product': productId};
            const cart = await cartModel.findById(cartId);
            const findProduct = cart.products.some((product)=> product.product.toString() === productId);
            if (findProduct){
                await cartModel.updateOne(filter, {'products.$.quantity': Number(quantity)});
            }else{
                console.log('Error updating product')
                return
            }
        } catch (error) {
            console.error('Error', error.message)
            return error
        }
    }

    deleteProduct = async (cartId, productId) => {
        try {
            const cart = await cartModel.findById(cartId)
            cart.products = cart.products.filter(product => product.product.toString() != productId);
            cart.save()
            return console.log('Cart modified', cart)
        } catch (error) {
            console.error('Error', error.message)
            return error
        }
    }

    deleteCart = async (cartId) => {
        try {
            await cartModel.findByIdAndDelete(cartId)
            return console.log('Cart deleted: '+cartId)
        } catch (error) {
            console.error('Error', error.message)
            return error
        }
    }
}

export default CartManager;