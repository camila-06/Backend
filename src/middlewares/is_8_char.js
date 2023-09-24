export default function (req,res,next) {
    try {
        let { password } = req.body
        if (password.length>=8) {
            next()
        } else {
            return res.render('error', {
                status: 411,
                error: 'password must have at least 8 characters'
            })
        }
    } catch (error) {
        next(error)
    }
}