import { Request, Response } from "express";
import { ProdutoService } from "../service/ProdutoService";
import { CustomRequest } from "../middleware/authMiddleware";

const produtoService = new ProdutoService();

// @Post
export async function cadastrarProduto(req: Request, res: Response): Promise<Response> {
  try {
    const novoProduto = await produtoService.cadastrarProduto(req.body);
    return res.status(201).json({
      mensagem: "Produto adicionado com sucesso!",
      produto: novoProduto,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

// @Put
export async function atualizarProduto(req: Request, res: Response): Promise<Response> {
  try {
    const produto = await produtoService.atualizarProduto(req.body);
    return res.status(200).json({
      mensagem: "Produto atualizado com sucesso!",
      produto: produto,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

// @Delete
export async function deletarProduto(req: Request, res: Response): Promise<Response> {
  try {
    const produto = await produtoService.deletarProduto(req.body);
    return res.status(200).json({
      mensagem: "Produto deletado com sucesso!",
      produto: produto,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

// @Get("id")
export async function filtrarProduto(req: CustomRequest, res: Response): Promise<Response> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(403).json({ message: "Usuário não autenticado!" });
    }

    const id = parseInt(req.query.id as string, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID do produto inválido!" });
    }

    const produto = await produtoService.filtrarProduto(id, userId);

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado!" });
    }

    return res.status(200).json({
      mensagem: "Produto encontrado com sucesso!",
      produto: produto,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

// @Get("all")
export async function listarTodosProduto(req: CustomRequest, res: Response): Promise<Response> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(403).json({ message: "Usuário não autenticado!" });
    }

    const produtos = await produtoService.listarTodosProdutos(userId);

    if (produtos.length === 0) {
      return res.status(404).json({ message: "Nenhum produto encontrado!" });
    }

    return res.status(200).json({
      mensagem: "Produtos listados com sucesso!",
      produtos: produtos,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
