const {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth'); //search for x-auth and get the token 
  User.findByToken(token).then((data)=>{
    if (!data) {
      return Promise.reject();
    }
    req.data = data;
    req.token = token;
    next();
  }).catch(err => res.status(401).send());
}

module.exports = {authenticate};
