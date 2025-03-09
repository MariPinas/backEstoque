import express from 'express';
import { produtoController } from './controller/ProdutoController';  
import { usuarioController } from './controller/UsuarioController';  
import { authController } from './controller/authController';       
import { verifyJWT } from './middleware/authMiddleware';         

const app = express();
const PORT = 3040;

// Middleware para permitir requisições JSON
app.use(express.json());

// Endpoints de Produtos
app.post('/produto', verifyJWT, ProdutoController.criarProduto);        // Cria um produto
app.get('/produto', verifyJWT, ProdutoController.listarProdutos);       // Lista todos os produtos
app.get('/produto/:id', verifyJWT, ProdutoController.buscarProduto);    // Busca um produto por ID
app.put('/produto/:id', verifyJWT, ProdutoController.atualizarProduto); // Atualiza um produto
app.delete('/produto/:id', verifyJWT, ProdutoController.deletarProduto);// Deleta um produto

// Endpoints de Usuários
app.post('/usuario', UsuarioController.criarUsuario);                   // Cria um usuário (registro)
app.get('/usuario/:id', verifyJWT, UsuarioController.buscarUsuario);    // Busca um usuário por ID
app.put('/usuario/:id', verifyJWT, UsuarioController.atualizarUsuario); // Atualiza um usuário
app.delete('/usuario/:id', verifyJWT, UsuarioController.deletarUsuario);// Deleta um usuário

// Endpoints de Autenticação
app.post('/login', AuthController.login);  // Autentica o usuário e gera o token JWT

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`API online na porta: ${PORT}`);
});
