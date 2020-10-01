import jwt from 'jsonwebtoken';
import config from 'config';

const checkToken = (req, res, next) => {

  const token = req.headers['x-access-token'];

  if(!token) {
    return res.status(401).send({success: false, message: 'No token provide'});
  }

  return jwt.verify(token, config.get('Config.Token.secret_token'), (err, decoded)=>{
    if(err) {
      return res.status(401).send({success: false, message: 'Faild authenticate token'});
    }

    return next();
  });
}


export default checkToken;
