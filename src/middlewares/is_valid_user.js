import User from "../dao/models/users.model.js"

export default async function(req,res,next) {
    try {
        const { mail,password } = req.body
        let user = await User.findOne({ mail })
        if (user && user.password===password) {
            next()
        } else {
            return res.render('error', {
                status: 400,
                error: 'Invalid credential'
            })
        }
    } catch (error) {
        next(error)
    }
}