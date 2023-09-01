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
            const cart = await cartModel.findById(cartId);
            return cart;
        } catch (error) {
            console.error('Error', error.message)
            return error;
        }
    }

    addProduct = async (cartId, productId, quantity) => {
        try {
            console.log(cartId, productId, quantity)
            const filter = {_id: cartId, 'products._id': productId};
            const cart = await cartModel.findById(cartId);
            const findProduct = cart.products.some((product)=> product._id.toString() === productId);

            if (findProduct){
                const update = {$inc: {'products.$.quantity': quantity}}
                await cartModel.updateOne(filter, update);
            }else{
                const update = {$push: {products: {_id: productId, quantity: quantity}}};
                await cartModel.updateOne({_id: cartId}, update);
            }
            return await cartModel.findById(cartId);
        } catch (error) {
            console.error('Error', error.message)
            return error
        }
    }
}

export default CartManager;