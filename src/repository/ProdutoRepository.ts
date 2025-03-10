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
            FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE
            
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
      "INSERT INTO estoque.Produto (nome, preco, descricao, quantidade, usuario_id) VALUES (?, ?, ?, ?, ?)";

    try {
      console.log("repo");
      const resultado = await executarComandoSQL(query, [
        produto.nome,
        produto.preco,
        produto.descricao,
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
    console.log("id", produto.id)
    console.log("aaaaaaa4")
    console.log("user", produto.usuario_id)
    let query = "UPDATE estoque.Produto SET";
    const params: Array<any> = [];
    const fields: string[] = [];

    if (produto.nome) {
      fields.push("nome = ?");
      params.push(produto.nome);
    }

    if (produto.preco) {
      fields.push("preco = ?");
      params.push(produto.preco);
    }

    if (produto.descricao) {
      fields.push("descricao = ?");
      params.push(produto.descricao);
    }

    if (produto.quantidade) {
      fields.push("quantidade = ?");
      params.push(produto.quantidade);
    }

    // Juntar todos os campos
    query += " " + fields.join(", ");
    query += " WHERE id = ? AND usuario_id = ?";
    params.push(produto.id, produto.usuario_id);

    try {
      console.log("SQL Gerado:", query);
      console.log("Parâmetros:", params);

      const resultado = await executarComandoSQL(query, params);

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
      console.log("Produto deletado com sucesso!");
      return new Promise<Produto>((resolve) => {
        resolve(resultado);
      });
    } catch (err: any) {
      console.error(
        `Falha ao deletar o produto de ID ${produto.id} gerando o erro: ${err}`
      );
      throw err;
    }
  }

  async filterProduto(id: number, usuario_id: number): Promise<Produto[]> {
    const query = "SELECT * FROM estoque.Produto where id = ? and usuario_id=?";

    try {
      const resultado = await executarComandoSQL(query, [id, usuario_id]);
      if (resultado.affectedRows === 0) {
        throw new Error(
          "Nenhum produto encontrado ou o usuário não tem permissão para ver este produto"
        );
      }
      console.log("Produto localizado com sucesso, ID: ", resultado);
      return new Promise<Produto[]>((resolve) => {
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

  async buscaProdutoPorIDeNome(id: number, nome: string): Promise<Produto[]> {
    if (!id || !nome) {
      throw new Error("ID ou nome não fornecido");
    }
    const query = "SELECT * FROM Produto WHERE id = ? AND nome = ?";
    try {
      const resultado = await executarComandoSQL(query, [id, nome]);
      return resultado;
    } catch (err: any) {
      console.error(`Falha ao buscar produto: ${err}`);
      throw err;
    }
  }
}
