import { Request, Response } from "express";
import { AuthService } from "../service/authService";

const authService = new AuthService();

// Cadastro
export async function register(req: Request, res: Response) {
  try {
    const { email, nome, senha } = req.body;
    const result = await authService.registerUser(email, nome, senha);
    res.status(result.status).json(result.response);
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor." });
  }
}

// Login
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(result.status).json(result.response);
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor." });
  }
}

//att senha
export async function updatePassword(req: Request, res: Response) {
  try {
    const { email, senhaAntiga, novaSenha } = req.body;
    const result = await authService.updatePassword(email, senhaAntiga, novaSenha);
    res.status(result.status).json(result.response);
  } catch (error) {
    res.status(500).json({ message: "Erro interno no servidor." });
  }
}
