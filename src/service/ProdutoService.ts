import { Produto } from "../model/Produto";
import { ProdutoRepository } from "../repository/ProdutoRepository";

export class ProdutoService {
  productRepository: ProdutoRepository = new ProdutoRepository();

  async cadastrarProduto(produtoData: any): Promise<Produto> {
    const { nome, preco, descricao, imagem, quantidade, usuario_id } =
      produtoData;

    const produto = new Produto(
      undefined,
      nome,
      preco,
      descricao,
      imagem,
      quantidade,
      usuario_id
    );

    const novoProduto = await this.productRepository.insertProduto(produto);
    console.log("Service - Produto inserido: ", novoProduto);
    return novoProduto;
  }

  async atualizarProduto(produtoData: any): Promise<Produto> {
    const { id, nome, preco, descricao, imagem, quantidade } = produtoData;

    const produto = new Produto(id, nome, preco, descricao, imagem, quantidade);

    await this.productRepository.updateProduto(produto);
    console.log("Service - Produto atualizado: ", produto);
    return produto;
  }

  async deletarProduto(produtoData: any): Promise<Produto[]> {
    const { id, nome, preco, descricao, imagem, quantidade, usuario_id } = produtoData;
  
    const produto = new Produto(id, nome, preco, descricao, imagem, quantidade, usuario_id);
    const produtoEncontrado = await this.productRepository.buscaProdutoPorIDeNome(id, nome);
  
    if (produtoEncontrado.length === 0) {
      throw new Error("404!!! Not Found - Produto não encontrado!!");
    }
  
    await this.productRepository.deleteProduto(produto);
    console.log("Service - Produto deletado: ", produto);
    return produtoEncontrado;
  }
  

  async filtrarProduto(id: number, usuario_id: number): Promise<Produto> {
    const produto = await this.productRepository.filterProduto(id, usuario_id);
    console.log("Service - Produto filtrado: ", produto);
    return produto;
}

async listarTodosProdutos(usuario_id: number): Promise<Produto[]> {
    const produtos = await this.productRepository.filterAllProduto(usuario_id);
    console.log("Service - Todos os produtos listados para o usuário", usuario_id, ": ", produtos);
    return produtos;
}
}
