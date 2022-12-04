const jwt = require('jsonwebtoken');
const SECRET_KEY = "aaa";

module.exports = (req, res, next) => {

  const authToken = req.headers['authorization'];

  if(authToken) {
    let token = authToken.split(' ')[1];
    
    try {
      let decode = jwt.verify(token, SECRET_KEY);
      
      if(decode.role == 1) return next();

      return res.status(401).json({err: "Unauthorized"});
    }catch(err) {
      return res.status(401).json({err});
    }
  } 
  return res.status(401).json({err: "Unauthorized"});
}