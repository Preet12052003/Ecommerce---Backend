const passport = require("passport")

exports.isAuth = (req , res , next) => {
    return passport.authenticate("jwt")
}

exports.sanitizeUser = (user) => {
    return {id: user.id , role: user.role}
}