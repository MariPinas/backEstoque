import { Request, Response } from "express";
import { ProdutoService } from "../service/ProdutoService";
import { CustomRequest } from "../middleware/authMiddleware";
import { upload } from "../middleware/upload";

const produtoService = new ProdutoService();

// @Post
export const cadastrarProduto = async (req: CustomRequest, res: Response) => {
  upload.single('imagem')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Erro ao fazer upload da imagem', error: err.message });
    }
    const usuario_id = req.user;

    if (!usuario_id) {
      return res.status(403).json({ message: 'Usuário não autenticado' });
    }

    try {
      const { nome, preco, descricao, quantidade } = req.body;
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`;
      const novoProduto = await produtoService.cadastrarProduto({ nome, preco, descricao, quantidade, imageUrl, usuario_id });
      
      res.status(201).json(novoProduto);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cadastrar produto', error });
    }
  });
};

// @Put
export const atualizarProduto = async (req: CustomRequest, res: Response) => {
  upload.single('imagem')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Erro ao fazer upload da imagem', error: err.message });
    }
    
    try {
      const produtoAtualizado = await produtoService.atualizarProduto({
        ...req.body,
        usuario_id: req.user, //pega o token
      });

      return res.status(200).json({
        mensagem: "Produto atualizado com sucesso!",
        produto: produtoAtualizado,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  });
}; 

// @Delete
export async function deletarProduto(req: CustomRequest, res: Response): Promise<Response> {
  try {
    const produtoDel = await produtoService.deletarProduto({
      ...req.body,
      usuario_id: req.user,
    });
    return res.status(200).json({
      mensagem: "Produto deletado com sucesso!",
      produto: produtoDel,
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
