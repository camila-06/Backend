import { Router } from "express";
import ProductManager from "../dao/managerMongo/productManagerMongo.js";
import productModel from "../dao/models/products.model.js"
const router = Router();

const productManager = new ProductManager();

router.get('/', async (req,res)=>{
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    let query = req.query.query;
    let filter = query ? {category: query} : null;
    let sort = req.query.sort;
    let prevLink;
    let nextLink;

    const options = {
        limit,
        page,
        lean: true,
        sort: {price: sort}
    }

    if (sort === 'asc'){
        sort = -1
    }else if (sort === 'desc'){
        sort = 1
    }else{
        delete options.sort
    }

    const products = await productModel.paginate(filter, options)

    if (sort && filter){
        prevLink = products.hasPrevPage ? `/products?limit=${limit}&page=${products.prevPage}&query=${query}&sort=${req.query.sort}` : null
        nextLink = products.hasNextPage ? `/products?limit=${limit}&page=${products.nextPage}&query=${query}&sort=${req.query.sort}` : null
    } else if (sort){
        prevLink = products.hasPrevPage ? `/products?limit=${limit}&page=${products.prevPage}&sort=${req.query.sort}` : null
        nextLink = products.hasNextPage ? `/products?limit=${limit}&page=${products.nextPage}&sort=${req.query.sort}` : null
    } else if (filter){
        prevLink = products.hasPrevPage ? `/products?limit=${limit}&page=${products.prevPage}&query=${query}` : null
        nextLink = products.hasNextPage ? `/products?limit=${limit}&page=${products.nextPage}&query=${query}` : null
    }else {
        prevLink = products.hasPrevPage ? `/products?limit=${limit}&page=${products.prevPage}` : null
        nextLink = products.hasNextPage ? `/products?limit=${limit}&page=${products.nextPage}` : null
    }
    
    if ((page > products.totalPages) || (page < 0)){
        return res.status(400).send({status: 'error', error: 'page not found'})
    }
    res.send({status: 'success', products})
})

router.get('/:pid', async (req,res)=>{
    const id = req.params.pid;
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
    const id = req.params.pid;
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