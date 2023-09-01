import { Router } from "express";
// import ProductManager from "../dao/manager/productManager.js";
import ProductManager from "../dao/managerMongo/productManagerMongo.js";
const router = Router();

// const productManager = new ProductManager('./src/files/products.json');
const productManager = new ProductManager();

router.get('/', async (req,res)=>{
    const products = await productManager.getProducts();
    let limit = req.query.limit

    if (!limit) res.send({status: 'success', products})
    else{
        const prodLimit = []
        if (limit > products.length) limit = products.length
        for (let i = 0; i < limit; i++){
            prodLimit.push(products[i])
        }
        res.send({prodLimit})
    }
})

router.get('/:pid', async (req,res)=>{
    const id = Number(req.params.pid);
    const productId = await productManager.getProductById(id);
    if (!productId){
        return res.status(400).send({status: 'error', error: 'product not found'})
    }
    res.send({status: 'success', productId})
})

router.post('/', async(req,res)=>{
    const newProduct = req.body;
    if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category){
        return res.status(400).send({error: 'incomplete values'})
    }
    await productManager.addProduct(newProduct)
    res.send({status: 'success', message: 'product added'})
})

router.put('/:pid', async (req,res)=>{
    const id = Number(req.params.pid);
    const product = req.body;
    const productId = await productManager.updateProduct(id, product);
    res.send({status: 'success', productId})
})

router.delete('/:pid', async(req,res)=>{
    const id = req.params.pid;
    const productId = await productManager.deleteProduct(id);
    res.send({status: 'success', productId})
})

export default router;