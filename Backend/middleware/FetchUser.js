const JWT_SECRET = "sachinisagood$boy"
var jwt = require('jsonwebtoken');
module.exports.fetchUser=(req,res,next)=>{
  const token = req.header('auth-token')
  if(!token){
    res.status(401).send({
        error: "Please authenticate using a valid token"
    })
  }
  try {
    const data = jwt.verify(token,JWT_SECRET)

  req.user = data.user
  next()
  } catch (error) {
    res.status(401).send({
        error:"Please authenticate using a valid token"
    })
  }

  
}