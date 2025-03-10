import { ProdutoService } from "./../service/ProdutoService";
import { Request, Response } from "express";
import { CustomRequest } from "../middleware/authMiddleware";
import { upload } from "../middleware/upload";

const produtoService = new ProdutoService();

// @Post
export async function cadastrarProduto(req: CustomRequest, res: Response) {
  try {
    const usuario_id = req.user?.id;

    if (!usuario_id) {
      return res.status(400).json({ message: "Usuário não autenticado." });
    }

    const { nome, preco, descricao, quantidade } = req.body;

    if (!nome || !preco || !descricao || !quantidade) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    const produtoData = {
      nome,
      preco,
      descricao,
      quantidade,
      usuario_id,
    };

    console.log("Dados do Produto:", produtoData);

    const produto = await produtoService.cadastrarProduto(produtoData);

    return res.status(201).json({
      mensagem: "Produto criado com sucesso!",
      produto: produto,
    });
  } catch (error: any) {
    console.error("Erro ao cadastrar produto:", error);
    return res
      .status(400)
      .json({ message: "Erro ao cadastrar produto", error: error.message });
  }
}

// @Put
export const atualizarProduto = async (req: CustomRequest, res: Response) => {
  try {
    const usuario_id = req.user?.id;

    if (!usuario_id) {
      return res.status(400).json({ message: "Usuário não autenticado." });
    }
    const produtoId = Number(req.params.id);

    if (!produtoId) {
      return res.status(400).json({ message: "ID do produto não fornecido." });
    }

    const { nome, preco, descricao, quantidade } = req.body;
    if (!nome || !preco || !descricao || !quantidade) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    const produtoData = {
      id: produtoId,
      nome,
      preco,
      descricao,
      quantidade,
      usuario_id,
    };
    const produtoAtualizado = await produtoService.atualizarProduto(
      produtoData
    );

    return res.status(200).json({
      mensagem: "Produto atualizado com sucesso!",
      produto: produtoAtualizado,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// @Delete
export const deletarProduto = async (req: CustomRequest, res: Response) => {
  try {
    const usuario_id = req.user?.id;
    const produtoId = Number(req.params.id);

    if (!usuario_id) {
      return res.status(400).json({ message: "Usuário não autenticado." });
    }

    if (!produtoId) {
      return res.status(400).json({ message: "ID do produto inválido." });
    }

    const produtoDel = await produtoService.deletarProduto({
      id: produtoId,
      usuario_id: usuario_id,
    });

    if (!produtoDel) {
      return res
        .status(404)
        .json({
          message:
            "Produto não encontrado ou você não tem permissão para deletá-lo.",
        });
    }

    return res.status(200).json({ message: "Produto deletado com sucesso!" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// @Get("id")
export async function filtrarProduto(
  req: CustomRequest,
  res: Response
): Promise<Response> {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(403).json({ message: "Usuário não autenticado!" });
    }

    const produtoId = Number(req.params.id);

    const produto = await produtoService.filtrarProduto(produtoId, userId);

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
export async function listarTodosProduto(
  req: CustomRequest,
  res: Response
): Promise<Response> {
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
