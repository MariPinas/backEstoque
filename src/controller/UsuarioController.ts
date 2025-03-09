import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";
import { CustomRequest } from "../middleware/authMiddleware";

const usuarioService = new UsuarioService();

// @Put
export async function atualizarUsuario(req: CustomRequest, res: Response): Promise<Response> {
  try {
    const usuarioId = req.user?.id;
    if (!usuarioId) {
      return res.status(403).json({ message: "Usuário não autenticado!" });
    }
    const { senha, ...dadosAtualizados } = req.body;
    console.log(usuarioId, "controller id");
    console.log(req.body, "dados do corpo da requisição");
    const usuario = await usuarioService.atualizarUsuario(usuarioId, dadosAtualizados );
    return res.status(200).json({
      mensagem: "Usuário atualizado com sucesso!",
      usuario: usuario,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

// @Delete
export async function deletarUsuario(req: CustomRequest, res: Response): Promise<Response> {
  try {
    const usuarioId = req.user?.id;

    if (!usuarioId) {
      return res.status(400).json({ message: "ID do usuário não fornecido." });
    }

    const usuario = await usuarioService.deletarUsuario(usuarioId);
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
    const userId = req.user?.id;

    if (!userId) {
      return res.status(403).json({ message: "Usuário não autenticado!" });
    }

    const usuario = await usuarioService.filtrarUsuario(userId);

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
