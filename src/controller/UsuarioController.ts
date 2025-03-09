import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";
import { CustomRequest } from "../middleware/authMiddleware";

const usuarioService = new UsuarioService();

// @Put
export async function atualizarUsuario(req: Request, res: Response): Promise<Response> {
  try {
    const usuario = await usuarioService.atualizarUsuario(req.body);
    return res.status(200).json({
      mensagem: "Usuário atualizado com sucesso!",
      usuario: usuario,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

// @Delete
export async function deletarUsuario(req: Request, res: Response): Promise<Response> {
  try {
    const usuario = await usuarioService.deletarUsuario(req.body);
    return res.status(200).json({
      mensagem: "Usuário deletado com sucesso!",
      usuario: usuario,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

// @Get("id")
export async function filtrarUsuario(req: CustomRequest, res: Response): Promise<Response> {
  try {
    const userId = req.user?.id; // middleware de autenticacao JWT.

    if (!userId) {
      return res.status(403).json({ message: "Usuário não autenticado!" });
    }

    const id = parseInt(req.query.id as string, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID do usuário inválido!" });
    }

    const usuario = await usuarioService.filtrarUsuario(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    return res.status(200).json({
      mensagem: "Usuário encontrado com sucesso!",
      usuario: usuario,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
