export default function (req,res,next) {
    try {
        if (req.session.role==="1")  {
            next()
        } else {
            return res.render('error', {
                status: 403,
                error: 'Forbidden'
            })
        }
    } catch (error) {
        next(error)
    }
}