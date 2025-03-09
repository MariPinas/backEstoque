import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'cocacola';  

export interface CustomRequest extends Request {
  user?: { id: number };  
}

// middleware verifica o token
export function verifyJWT(req: CustomRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];  // Verifica se o token esta presente

  if (!token) {
    return res.status(403).json({ message: 'Token de autenticação não fornecido!' });
  }

  try {
    // Verifica o token JWT e decodifica para obter o ID do usuário
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };  // Decodifica o token
    req.user = decoded;  
    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado!' });
  }
}
