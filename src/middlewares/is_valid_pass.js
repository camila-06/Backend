import bcrypt from 'bcryptjs';
import User from "../dao/models/users.model.js"

export default async function (req,res,next) {
    let user = await User.findOne({mail: req.body.mail})
    let verified = bcrypt.compareSync(
        req.body.password,
        user.password
    )
    if (verified){
        return next()
    }
    return res.render('error', {
        status: 401,
        error: 'invalid credentials'
    })
}

