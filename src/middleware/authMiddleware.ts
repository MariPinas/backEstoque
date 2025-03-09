import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'cocacola';

export interface CustomRequest extends Request {
    user?: { id: number };  
}

// middleware para verificar o token JWT
export function verifyJWT(req: CustomRequest, res: Response, next: NextFunction) {
    //pega o token
    const token = req.headers.authorization?.split(' ')[1];  

    if (!token) {
        return res.status(403).json({ message: 'Token de autenticação não fornecido!' });
    }

    try {
        //verifica o token e decodifica
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded as { id: number }; //atribui os dados
        next();  //chama o proximo middleware/rota
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado!' });
    }
}
