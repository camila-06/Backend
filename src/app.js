import express from "express";
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => console.log('Listening on port 8080...'))
// const productManager = new ProductManager('products.json')

// app.get('/products', async (req,res) =>{
//     const products = await productManager.getProducts()

//     let limit = req.query.limit

//     if (!limit) res.json(products)
//     else{
//         const prodLimit = []
//         if (limit > products.length) limit = products.length
//         for (let i = 0; i < limit; i++){
//             prodLimit.push(products[i])
//         }
//         res.send({prodLimit})
//     }
// })

// app.get('/products/:pid', async (req, res) =>{
//     const id = req.params.pid
//     const product = await productManager.getProductById(id)
//     res.json(product)
// })