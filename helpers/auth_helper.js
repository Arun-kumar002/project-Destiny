module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        else {
            req.flash('ERROR_MESSAGE', 'your are not autherized')
            res.redirect('/user/login', 301, {})
        }
    }
}