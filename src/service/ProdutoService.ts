import { Produto } from "../model/Produto";
import { ProdutoRepository } from "../repository/ProdutoRepository";

export class ProdutoService {
  productRepository: ProdutoRepository = new ProdutoRepository();

  async cadastrarProduto(produtoData: any): Promise<Produto> {
    const { nome, preco, descricao, quantidade, usuario_id } = produtoData;
    console.log({ nome, preco, descricao, quantidade }, "service");
    const produto = new Produto(
      undefined,
      nome,
      preco,
      descricao,
      quantidade,
      usuario_id
    );

    const produtoCriado = await this.productRepository.insertProduto(produto);
    return produtoCriado;
  }

  async atualizarProduto(produtoData: any): Promise<Produto> {
    console.log("aaaaaaaaaaaaa3");
    await this.productRepository.updateProduto(produtoData);
    console.log("Service - Update ", produtoData);
    return produtoData;
  }

  async deletarProduto(produtoData: any): Promise<Produto[]> {
    const produtoEncontrado = await this.productRepository.filterProduto(
      produtoData.id,
      produtoData.usuario_id
    );

    if (produtoEncontrado.length === 0) {
      throw new Error("Produto não encontrado!");
    }

    await this.productRepository.deleteProduto(produtoData);
    console.log("Produto deletado com sucesso!");
    return produtoData;
  }

  async filtrarProduto(id: number, usuario_id: number): Promise<Produto[]> {
    const produto = await this.productRepository.filterProduto(id, usuario_id);
    console.log("Service - Produto filtrado: ", produto);
    return produto;
  }

  async listarTodosProdutos(usuario_id: number): Promise<Produto[]> {
    const produtos = await this.productRepository.filterAllProduto(usuario_id);
    console.log(
      "Service - Todos os produtos listados para o usuário",
      usuario_id,
      ": ",
      produtos
    );
    return produtos;
  }
  async getMaiorQuantidade(usuario_id: number): Promise<Produto | null> {
    const produto = await this.productRepository.getMaiorQuantidade(usuario_id);
    if (!produto) {
      throw new Error("Nenhum produto com quantidade disponível foi encontrado.");
    }
    return produto;
  }
}
