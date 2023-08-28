import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import ProductManager from "./manager/productManager.js"; 
import { Server } from "socket.io";

const productManager = new ProductManager(__dirname+'/files/products.json');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`));

const server = app.listen(8080, () => console.log('Listening on port 8080...'));

const socketServer = new Server(server);

socketServer.on('connection', async (socket)=>{
    console.log('client connected with ID:', socket.id)
    const products = await productManager.getProducts(); 
    socket.emit('productsList', products) 

    socket.on('addProduct', async (data)=>{ 
        await productManager.addProduct(data) 
        const products = await productManager.getProducts(); 
        socket.emit('productsList', products) 
    })

    socket.on('deleteProduct', async (id)=>{ 
        await productManager.deleteProduct(id) 
        const products = await productManager.getProducts(); 
        socket.emit('productsList', products) 
    })
});