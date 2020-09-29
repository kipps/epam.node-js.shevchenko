import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {

  const token = req.headers['x-access-token'];

  if(!token) {
    return res.status(401).send({success: false, message: 'No token provide'});
  }

  return jwt.verify(token, 'secret_token', (err, decoded)=>{
    if(err) {
      return res.status(401).send({success: false, message: 'Faild authenticate token'});
    }

    return next();
  });
}


export default checkToken;
