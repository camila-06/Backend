import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const productManager = new ProductManager('products.json')

app.get('/products', async (req,res) =>{
    const products = await productManager.getProducts()

    let limit = req.query.limit

    if (!limit) res.json(products)
    else{
        const prodLimit = []
        if (limit > products.length) limit = products.length
        for (let i = 0; i < limit; i++){
            prodLimit.push(products[i])
        }
        res.send({prodLimit})
    }
})

app.get('/products/:pid', async (req, res) =>{
    const id = req.params.pid
    const product = await productManager.getProductById(id)
    res.json(product)
})

app.listen(8080, () => console.log('Listening on port 8080...'))