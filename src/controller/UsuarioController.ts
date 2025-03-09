import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";
import { CustomRequest } from "../middleware/authMiddleware";

const productService = new UsuarioService();

export async function atualizarUsuario (req: Request, res: Response){
    try {
        const produto = await productService.atualizarUsuario(req.body);
        res.status(200).json(
            {
                mensagem:"Usuario atualizado com sucesso!",
                produto:produto
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export async function deletarUsuario (req: Request, res: Response){
    try {
        const produto = await productService.deletarUsuario(req.body);
        res.status(200).json(
            {
                mensagem:"Usuario deletado com sucesso!",
                produto:produto
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export async function filtrarUsuario(req: CustomRequest, res: Response) {
    try {
        // pega o id do usuario autenticado/logado
        const userId = req.user?.id;  // middleware de autenticacao JWT.
        

        if (!userId) {
            return res.status(403).json({ message: "Usuário não autenticado!" });
        }

        const id = parseInt(req.query.id as string, 10);

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID do produto inválido!" });
        }

        const produto = await productService.filtrarUsuario(id);

        if (!produto) {
            return res.status(404).json({ message: "Usuario não encontrado!" });
        }

        res.status(200).json({
            mensagem: "Usuario encontrado com sucesso!",
            produto: produto,
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

