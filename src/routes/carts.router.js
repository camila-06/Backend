import { Router } from "express";
// import CartManager from "../dao/manager/cartManager.js";
import CartManager from "../dao/managerMongo/cartManagerMongo.js";

const router = Router();
// const cartManager = new CartManager('./src/files/carts.json');
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

export default router;