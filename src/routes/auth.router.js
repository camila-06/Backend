import { Router } from "express";
import userModel from "../dao/models/users.model.js";
import is_form_ok from "../middlewares/is_form_ok.js";
import is_8_char from "../middlewares/is_8_char.js";
import create_hash from "../middlewares/create_hash.js";
import is_valid_pass from "../middlewares/is_valid_pass.js";
import passport from "passport";
import create_token from "../middlewares/create_token.js";

const router = Router();

router.post(
    '/register', 
    is_form_ok, 
    is_8_char, 
    create_hash, 
    passport.authenticate('register', {failureRedirect:'/api/auth/fail-register'}),
    async (req,res)=> {
        return res.redirect('/')
        }
)

router.get('/fail-register', (req,res)=> res.status(400).json({
    success: false,
    message: 'fail register'
}))

router.post('/login', 
    is_8_char, 
    passport.authenticate('login', {failureRedirect:'/api/auth/fail-register'}),
    is_valid_pass, 
    create_token,
    async (req,res,next)=>{
        try {
            req.session.mail = req.body.mail
            let user = await userModel.findOne({mail: req.body.mail})
            req.session.user = user.name
            req.session.photo = user.photo
            req.session.role = user.role
            if (req.session.role == "1"){
                return res.redirect('/products')
            }else{
                return res.redirect('/home')
            }
        } catch (error) {
            next(error)
        }
})

router.get('/signout', (req,res, next)=>{
    try {
        req.session.destroy()
        return res.redirect('/')
    } catch (error) {
        next(error)
    }
})

router.get('/github', 
    passport.authenticate('github', { scope:['user:email'] }), (req,res)=>{}
)

router.get('/github/callback', passport.authenticate('github', {}), (req,res,next)=>{
    try {
        req.session.mail = req.user.mail;
        req.session.role = req.user.role;
        return res.status(200).json({
            success:true,
            user: req.user
        })
    } catch (error) {
        next(error)
    }
})

export default router;