import { executarComandoSQL } from "../db/mysql";
import { Produto } from "../model/Produto";

export class ProdutoRepository {
  constructor() {
    this.createTable();
  }

  private async createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS estoque.Produto (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            preco DECIMAL(10, 2) NOT NULL,
            descricao TINYTEXT,
            imagem VARCHAR(255) NOT NULL,
            quantidade INT NOT NULL,
            usuario_id INT NOT NULL,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            
        )`;

    try {
      const resultado = await executarComandoSQL(query, []);
      console.log("Query executada com sucesso:", resultado);
    } catch (err) {
      console.error("Error");
    }
  }

  async insertProduto(produto: Produto): Promise<Produto> {
    const query =
      "INSERT INTO estoque.Produto (nome, preco, descricao, imagem, quantidade, usuario_id) VALUES (?, ?, ?, ?, ?, ?)";

    try {
      const resultado = await executarComandoSQL(query, [
        produto.nome,
        produto.preco,
        produto.descricao,
        produto.imagem,
        produto.quantidade,
        produto.usuario_id,
      ]);
      console.log("Produto inserido com sucesso, ID: ", resultado.insertId);
      produto.id = resultado.insertId;
      return new Promise<Produto>((resolve) => {
        resolve(produto);
      });
    } catch (err) {
      console.error("Erro ao inserir o produto:", err);
      throw err;
    }
  }

  async updateProduto(produto: Produto): Promise<void> {
    const query =
      "UPDATE estoque.Produto SET nome = ?, preco = ?, descricao = ?, imagem = ?, quantidade = ? WHERE id = ? AND usuario_id = ?";

    try {
      const resultado = await executarComandoSQL(query, [
        produto.nome,
        produto.preco,
        produto.descricao,
        produto.imagem,
        produto.quantidade,
        produto.id,
        produto.usuario_id,
      ]);
      if (resultado.affectedRows === 0) {
        throw new Error(
          "Nenhum produto encontrado ou o usuário não tem permissão para atualizar este produto"
        );
      }
      console.log("Produto atualizado com sucesso.");
    } catch (err) {
      console.error("Erro ao atualizar o produto:", err);
      throw err;
    }
  }

  async deleteProduto(produto: Produto): Promise<Produto> {
    const query = "DELETE FROM estoque.Produto where id = ? AND usuario_id= ?;";

    try {
      const resultado = await executarComandoSQL(query, [
        produto.id,
        produto.usuario_id,
      ]);
      if (resultado.affectedRows === 0) {
        throw new Error(
          "Nenhum produto encontrado ou o usuário não tem permissão para deletar este produto"
        );
      }
      console.log("Produto deletado com sucesso: ", produto);
      return new Promise<Produto>((resolve) => {
        resolve(produto);
      });
    } catch (err: any) {
      console.error(
        `Falha ao deletar o produto de ID ${produto.id} gerando o erro: ${err}`
      );
      throw err;
    }
  }

  async filterProduto(id: number, usuario_id: number): Promise<Produto> {
    const query = "SELECT * FROM estoque.Produto where id = ? and usuario_id=?";

    try {
      const resultado = await executarComandoSQL(query, [id, usuario_id]);
      if (resultado.affectedRows === 0) {
        throw new Error(
          "Nenhum produto encontrado ou o usuário não tem permissão para ver este produto"
        );
      }
      console.log("Produto localizado com sucesso, ID: ", resultado);
      return new Promise<Produto>((resolve) => {
        resolve(resultado);
      });
    } catch (err: any) {
      console.error(
        `Falha ao procurar o produto de ID ${id} gerando o erro: ${err}`
      );
      throw err;
    }
  }

  async filterAllProduto(usuario_id: number): Promise<Produto[]> {
    const query = "SELECT * FROM estoque.Produto where usuario_id = ?";

    try {
      const resultado = await executarComandoSQL(query, [usuario_id]);
      return new Promise<Produto[]>((resolve) => {
        resolve(resultado);
      });
    } catch (err: any) {
      console.error(`Falha ao listar os produtos gerando o erro: ${err}`);
      throw err;
    }
  }
}
