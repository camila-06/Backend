import { Router } from "express";
import ProductManager from "../manager/productManager.js";

const router = Router();

const productManager = new ProductManager('./src/files/products.json');

router.get('/', async (req,res)=>{
    const products = await productManager.getProducts();
    res.render('home', {products})
});

router.get('/realTimeProducts', (req,res)=>{
    res.render('realTimeProducts')
});

export default router;