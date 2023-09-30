import 'dotenv/config.js'
import express from "express";
import { connect } from "mongoose";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import inicializePassport from './middlewares/passport.js';
import passport from 'passport';
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import authRouter from './routes/auth.router.js';
import ProductManager from "./dao/managerMongo/productManagerMongo.js";
import MessageManager from "./dao/managerMongo/messageManagerMongo.js";
import { Server } from "socket.io";

const app = express();

app.use(cookieParser(process.env.SECRET_COOKIE))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.LINK_DB,
        ttl:60*60*24*7
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}))

inicializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(express.urlencoded({extended: true}));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/auth', authRouter);
app.use('/', viewsRouter);
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`));

const PORT = process.env.PORT;
const ready = async () =>{
    console.log('Listening on port '+PORT)
    await connect(process.env.LINK_DB)
        .then(()=>console.log('database connected'))
        .catch(err=>console.log(err))
}

const server = app.listen(PORT, ready);

const socketServer = new Server(server);

const productManager = new ProductManager();
const messageManager = new MessageManager();

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