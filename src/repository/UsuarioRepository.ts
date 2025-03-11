import { executarComandoSQL } from "../db/mysql";
import { Produto } from "../model/Produto";
import { Usuario } from "../model/Usuario";


export class UsuarioRepository {
  private static instance: UsuarioRepository;

  constructor() {
    this.createTable();
  }

  public static getInstance(): UsuarioRepository {
    if (!this.instance) {
        this.instance = new UsuarioRepository();
    }
    return this.instance
}

  public async createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS estoque.Usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            senha VARCHAR(255) NOT NULL
        )`;

    try {
      const resultado = await executarComandoSQL(query, []);
      console.log("Tabela Usuario criada ou já existe:", resultado);
    } catch (err) {
      console.error("Erro ao criar tabela Usuario:", err);
    }
  }

  async insertUsuario(usuario: Usuario): Promise<Usuario> {
    console.log("teste register usu repo");
    console.log(usuario);
    const query =
      "INSERT INTO estoque.Usuario (nome, email, senha) VALUES (?, ?, ?)";
    try {
      const resultado = await executarComandoSQL(query, [
        usuario.nome,
        usuario.email,
        usuario.senha,
      ]);
      console.log("Usuário inserido com sucesso, ID: ", resultado.insertId);
      usuario.id = resultado.insertId;
      return new Promise<Usuario>((resolve) => {
        resolve(usuario);
      });
    } catch (err) {
      console.error("Erro ao inserir o usuário:", err);
      throw err;
    }
  }
  async updateUsuario(usuario: Usuario): Promise<Usuario> {
    console.log(usuario.id, "usuario id repository")
    let query = "UPDATE estoque.Usuario SET";
    const values: any[] = [];
  
    if (usuario.nome) {
      query += " nome = ?,";
      values.push(usuario.nome);
    }
    if (usuario.email) {
      query += " email = ?,";
      values.push(usuario.email);
    }
    if (usuario.senha) {
      query += " senha = ?,";
      values.push(usuario.senha);
    }
    query = query.slice(0, -1);
    query += " WHERE id = ?";
    values.push(usuario.id);
  
    try {
      const resultado = await executarComandoSQL(query, values);
      console.log("Usuário atualizado com sucesso, ID: ", resultado);
      return new Promise<Usuario>((resolve) => {
        resolve(resultado);
      });
    } catch (err) {
      console.error(`Erro ao atualizar o usuário de ID ${usuario.id}:`, err);
      throw err;
    }
  }
  

  async deleteUsuario(id: number): Promise<void> {
    const query = "DELETE FROM estoque.Usuario WHERE id = ?";
    try {
      const resultado = await executarComandoSQL(query, [id]);
      console.log(`Usuário com ID ${id} deletado com sucesso:`, resultado);
    } catch (err) {
      console.error(`Erro ao deletar o usuário de ID ${id}:`, err);
      throw err;
    }
  }

  async filterUsuarioById(id: number): Promise<Usuario & { produtos: Produto[] }> {
    const usuarioQuery = "SELECT * FROM estoque.Usuario WHERE id = ?";
    const produtosQuery = "SELECT * FROM estoque.Produto WHERE usuario_id = ?";

    try {
        const usuarioResultado = await executarComandoSQL(usuarioQuery, [id]);
        
        if (usuarioResultado.length === 0) {
            throw new Error("Usuário não encontrado");
        }
        
        const usuario = usuarioResultado[0];

        const produtosResultado = await executarComandoSQL(produtosQuery, [id]);

        return {
            ...usuario,
            produtos: produtosResultado, 
        };
    } catch (err) {
        console.error("Erro ao filtrar usuário:", err);
        throw err;
    }
}

  async findByEmail(email: string): Promise<Usuario | null> {
    const query = 'SELECT * FROM Usuario WHERE email = ?'; 
    
    try {
        const resultado = await executarComandoSQL(query, [email]);

        if (resultado.length === 0) {
            return null; // nao achou usuario
        }

        //mapea os dados do banco para o usuario
        const user = new Usuario(
            resultado[0].id,
            resultado[0].nome,
            resultado[0].email,
            resultado[0].senha,
        );

        return user;
    } catch (error) {
        console.error('Erro ao buscar o usuário por e-mail:', error);
        throw error;
    }
}
}
