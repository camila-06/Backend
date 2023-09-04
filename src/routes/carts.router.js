import { Router } from "express";
import CartManager from "../dao/managerMongo/cartManagerMongo.js";

const router = Router();
const cartManager = new CartManager();

router.post('/', async(req,res)=>{
    const newCart = {
        products: []
    }
    const result = await cartManager.addCart(newCart);
    res.send({status: 'success', result});
})

router.get('/:cid', async(req,res)=>{
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById(cartId);
    if (!cart){
        return res.status(404).send({error: 'cart not found'})
    }
    res.send({status: 'success', cart})
})

router.post('/:cid/product/:pid', async(req,res)=>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = 1;
    await cartManager.addProduct(cartId, productId, quantity)
    res.send({status: 'success', message: 'product added'})
})

router.put('/:cid', async (req,res)=>{
    const cartId = req.params.cid;
    const {products} = req.body;
    await cartManager.updateCart(cartId, products);
    res.send({status: 'success', message: 'cart updated'})
})

router.put('/:cid/products/:pid', async (req,res)=>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const {quantity} = req.body;
    await cartManager.updateProduct(cartId, productId, quantity)
    res.send({status: 'success', message: 'product updated'})
})

router.delete('/:cid/products/:pid', async(req,res)=>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    await cartManager.deleteProduct(cartId, productId)
    res.send({status: 'success', message: 'product deleted: '+productId})
})

router.delete('/:cid', async(req,res)=>{
    const cartId = req.params.cid
    await cartManager.deleteCart(cartId)
    res.send({status: 'success', message: 'cart deleted: '+cartId})
})

export default router;