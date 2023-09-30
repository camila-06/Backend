import jwt from "jsonwebtoken";

export default (req,res,next)=>{
    let token = jwt.sign(
        { email: req.body.mail },
        process.env.SECRET_KEY,
        { expiresIn: 60*60*24 }
    )
    req.session.token = token
    return next()
}