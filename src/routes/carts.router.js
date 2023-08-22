import { Router } from "express";
import CartManager from "../manager/cartManager.js";

const router = Router();
const cartManager = new CartManager('./src/files/carts.json');

router.post('/', async(req,res)=>{
    const cart = {
        products: []
    }
    const result = await cartManager.addCart(cart);
    res.send({status: 'success', result});
})

router.get('/:cid', async(req,res)=>{
    const cartId = Number(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    if (!cart){
        return res.status(404).send({error: 'cart not found'})
    }
    res.send({status: 'success', cart})
})

router.post('/:cid/product/:pid', async(req,res)=>{
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);
    const quantity = 1;
    await cartManager.addProduct(cartId, productId, quantity)
    res.send({status: 'success', message: 'product added'})
})

export default router;