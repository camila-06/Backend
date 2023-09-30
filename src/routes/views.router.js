import { Router } from "express";
import ProductManager from '../dao/managerMongo/productManagerMongo.js';
import CartManager from "../dao/managerMongo/cartManagerMongo.js";
import productModel from "../dao/models/products.model.js";
import is_admin from '../middlewares/is_admin.js';
import is_valid_pass from "../middlewares/is_valid_pass.js";

const router = Router();

const productManager = new ProductManager();
const cartManager = new CartManager();


router.get('/', async (req,res)=>{
    res.render('login')
});

router.get('/home', async(req,res)=>{
    const products = await productManager.getProducts();
    const user = req.user.name;
    const role = req.user.role;
    const photo = req.user.photo;
    res.render('home', {products, user, role, photo})
})

router.get('/products', is_admin, async (req,res)=>{
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
    const user = req.user.name;
    const role = req.user.role;
    const photo = req.user.photo;
    res.render('products', {products, prevLink, nextLink, user, role, photo})
});

router.get('/realTimeProducts', is_admin, async (req,res)=>{
    const user = req.user.name;
    const role = req.user.role;
    const photo = req.user.photo;
    res.render('realTimeProducts', {user, role, photo})
});

router.get('/carts/:cid', async (req,res)=>{
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById(cartId);
    if (!cart){
        return res.status(404).send({error: 'cart not found'})
    }
    const products = (cart[0].products).map(product =>{
        return {
            id: product.product._id.toString(),
            quantity: product.quantity,
            title: product.product.title,
            price: product.product.price
        }
    })
    const user = req.user.name;
    const role = req.user.role;
    const photo = req.user.photo;
    res.render('carts', {cart, cartId, products, user, role, photo})
})

router.get('/chat', (req,res)=>{
    res.render('chat')
})

router.get('/login', (req,res)=>{
    res.render('login')
})

router.get('/register', (req,res)=>{
    res.render('register')
})

export default router;