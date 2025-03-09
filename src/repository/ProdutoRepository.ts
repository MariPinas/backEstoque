import { executarComandoSQL } from "../db/mysql";
import { Produto } from "../model/Produto";


export class ProdutoRepository{

    constructor(){
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
            quantidade INT NOT NULL
            
        )`;

        try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insertProduto(produto:Produto) :Promise<Produto>{
        const query = "INSERT INTO estoque.Produto (nome, preco, descricao, imagem, quantidade) VALUES (?, ?, ?, ?, ?)" ;

        try {
            const resultado = await executarComandoSQL(query, [produto.nome, produto.preco, produto.descricao, produto.imagem, produto.quantidade]);
            console.log('Produto inserido com sucesso, ID: ', resultado.insertId);
            produto.id = resultado.insertId;
            return new Promise<Produto>((resolve)=>{
                resolve(produto);
            })
        } catch (err) {
            console.error('Erro ao inserir o produto:', err);
            throw err;
        }
    }

    async updateProduto(produto:Produto) :Promise<Produto>{
        const query = "UPDATE estoque.Produto set nome = ?, preco = ?, descricao = ?, imagem = ?, quantidade = ? where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [produto.nome, produto.preco,produto.descricao, produto.imagem, produto.quantidade, produto.id]);
            console.log('Produto atualizado com sucesso, ID: ', resultado);
            return new Promise<Produto>((resolve)=>{
                resolve(produto);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar o produto de ID ${produto.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteProduto(produto:Produto) :Promise<Produto>{
        const query = "DELETE FROM estoque.Produto where id = ?;" ;

        try {
            const resultado = await executarComandoSQL(query, [produto.id]);
            console.log('Produto deletado com sucesso: ', produto);
            return new Promise<Produto>((resolve)=>{
                resolve(produto);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o produto de ID ${produto.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterProduto(id: number) :Promise<Produto>{
        const query = "SELECT * FROM estoque.Produto where id = ?" ;

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Produto localizado com sucesso, ID: ', resultado);
            return new Promise<Produto>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao procurar o produto de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllProduto() :Promise<Produto[]>{
        const query = "SELECT * FROM estoque.Produto" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Produto[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar os produtos gerando o erro: ${err}`);
            throw err;
        }
    }

    
}