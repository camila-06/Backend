export default function (req,res,next) {
    try {
        let { name, mail, password } = req.body
        if (name && mail && password) {
            next()
        } else {
            return res.render('error', {
                status: 400,
                error: 'name, mail and password are required'
            })
        }
    } catch (error) {
        next(error)
    }
}