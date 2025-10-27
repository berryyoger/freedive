import jwt from 'jsonwebtoken';

export function authRequired(req,res,next){
  try {
    const h = req.headers.authorization || '';
    const [type, token] = h.split(' ');
    if (type !== 'Bearer' || !token){
      return res.status(401).json({ error:'Unauthorized' });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch(e){
    return res.status(401).json({ error:'Unauthorized' });
  }
}
