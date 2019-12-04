const passport = require('passport');

module.exports.in = function(req, res, next){
    if(req.isAuthenticated()){
        next(res.user)
    };
    next()
}
exports.andAdmin = function(req, res, next){

}