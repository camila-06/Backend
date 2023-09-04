import express from "express";
import { connect } from "mongoose";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import ProductManager from "./dao/managerMongo/productManagerMongo.js";
import MessageManager from "./dao/managerMongo/messageManagerMongo.js";
import { Server } from "socket.io";


const PORT = 8080;
const ready = async () =>{
    console.log('Listening on port '+PORT)
    await connect('mongodb+srv://cami:1234@care.8al6fy8.mongodb.net/ecommerce?retryWrites=true&w=majority')
        .then(()=>console.log('database connected'))
        .catch(err=>console.log(err))
}

const productManager = new ProductManager();
const messageManager = new MessageManager();
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

const server = app.listen(PORT, ready);

const socketServer = new Server(server);

socketServer.on('connection', async (socket)=>{
    console.log('client connected with ID:', socket.id)
    const products = await productManager.getProducts(); 
    socket.emit('productsList', products) 

    socket.on('addProduct', async (newProduct)=>{ 
        await productManager.addProduct(newProduct) 
        const products = await productManager.getProducts(); 
        socket.emit('productsList', products) 
    })

    socket.on('deleteProduct', async (id)=>{ 
        await productManager.deleteProduct(id) 
        const products = await productManager.getProducts(); 
        socket.emit('productsList', products) 
    })

    socket.on('authenticated', async (user)=>{
        const messages = await messageManager.getMessages()
        socket.emit('chatbox', messages)
        socket.broadcast.emit('newUserConnected', user)
    })

    socket.on('message', async (data)=>{
        await messageManager.createMessage(data)
        const messages = await messageManager.getMessages()
        socketServer.emit('chatbox', messages)
    })
});