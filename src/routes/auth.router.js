import { Router } from "express";
import userModel from "../dao/models/users.model.js";
import is_form_ok from "../middlewares/is_form_ok.js";
import is_8_char from "../middlewares/is_8_char.js";
import is_valid_user from "../middlewares/is_valid_user.js"

const router = Router();

router.post('/register', is_form_ok, is_8_char, async (req,res, next)=>{
    try {
        let user = await userModel.create(req.body)
        req.session.user = user.name
        req.session.photo = user.photo
        req.session.role = user.role
        return res.redirect('/products')
    } catch (error) {
        next(error)
    }
})

router.post('/login', is_8_char, is_valid_user, async (req,res)=>{
    try {
        req.session.mail = req.body.mail
        let user = await userModel.findOne({mail: req.body.mail})
        req.session.user = user.name
        req.session.photo = user.photo
        req.session.role = user.role
        if (req.session.role == "1"){
            return res.redirect('/realTimeProducts')
        }else{
            return res.redirect('/products')
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

export default router;