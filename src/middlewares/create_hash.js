import bcryptjs from 'bcryptjs';

export default function(req,res,next){
    req.body.password = bcryptjs.hashSync(
        req.body.password,
        bcryptjs.genSaltSync(10)
    )
    return next()
}