import { Request, Response } from "express";
import { ProdutoService } from "../service/ProdutoService";
import { CustomRequest } from "../middleware/authMiddleware";

const productService = new ProdutoService();

export async function cadastrarProduto (req: Request, res: Response){
    try {
        const novoProduto = await productService.cadastrarProduto(req.body);
        res.status(201).json(
            {
                mensagem:"Produto adicionado com sucesso!",
                produto:novoProduto
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export async function atualizarProduto (req: Request, res: Response){
    try {
        const produto = await productService.atualizarProduto(req.body);
        res.status(200).json(
            {
                mensagem:"Produto atualizado com sucesso!",
                produto:produto
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export async function deletarProduto (req: Request, res: Response){
    try {
        const produto = await productService.deletarProduto(req.body);
        res.status(200).json(
            {
                mensagem:"Produto deletado com sucesso!",
                produto:produto
            }
        );
    } catch (error: any) {
        res.status(400).json({ message: error.message});
    }
};

export async function filtrarProduto(req: CustomRequest, res: Response) {
    try {
        // pega o id do usuario autenticado/logado
        const userId = req.user?.id;  // middleware de autenticação JWT.
        
        if (!userId) {
            return res.status(403).json({ message: "Usuário não autenticado!" });
        }

        const id = parseInt(req.query.id as string, 10);

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID do produto inválido!" });
        }

        const produto = await productService.filtrarProduto(id, userId);

        if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado!" });
        }

        res.status(200).json({
            mensagem: "Produto encontrado com sucesso!",
            produto: produto,
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export async function listarTodosProduto(req: CustomRequest, res: Response) {
    try {
        const userId = req.user?.id; 
        
        if (!userId) {
            return res.status(403).json({ message: "Usuário não autenticado!" });
        }

        const produtos = await productService.listarTodosProdutos(userId);

        if (produtos.length === 0) {
            return res.status(404).json({ message: "Nenhum produto encontrado!" });
        }

        res.status(200).json({
            mensagem: "Produtos listados com sucesso!",
            produtos: produtos,
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
