import { Request, Response } from "express";
import { AuthService } from "../service/authService";

const authService = new AuthService();

// Cadastro
export async function register(req: Request, res: Response): Promise<Response> {
  try {
    const { nome, email, senha } = req.body;
    const result = await authService.registerUser(nome, email, senha);
    return res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso!'
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
}

// Login
export async function login(req: Request, res: Response): Promise<Response> {
  try {
    const { email, senha } = req.body;
    const result = await authService.loginUser(email, senha);
    
    if (result.status !== 200) {
      return res.status(result.status).json(result.response);
    }

    return res.status(200).json({
      success: true,
      message: 'Usuário realizou o login com sucesso!',
      token: result.response.token,
    });
  } catch (error) {
    console.error("Erro no login:", error); 
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
}


// Atualizar senha
export async function updatePassword(req: Request, res: Response): Promise<Response> {
  try {
    const { email, senhaAntiga, novaSenha } = req.body;
    const result = await authService.updatePassword(email, senhaAntiga, novaSenha);
    return res.status(200).json({
      success: true,
      message: 'Usuário atualizou sua senha com sucesso!'
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno no servidor." });
  }

}
