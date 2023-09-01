import { Router } from "express";
// import ProductManager from "../dao/manager/productManager.js";
import ProductManager from '../dao/managerMongo/productManagerMongo.js'

const router = Router();

// const productManager = new ProductManager('./src/files/products.json');
const productManager = new ProductManager();

router.get('/', async (req,res)=>{
    const products = await productManager.getProducts();
    res.render('home', {products})
});

router.get('/realTimeProducts', (req,res)=>{
    res.render('realTimeProducts')
});

router.get('/chat', (req,res)=>{
    res.render('chat')
})

export default router;