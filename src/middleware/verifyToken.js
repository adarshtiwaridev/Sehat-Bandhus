import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    const secret = process.env.JWT_SECRET || 'changeme';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    return next();
  } catch (err) {
    console.error('verifyToken error:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
