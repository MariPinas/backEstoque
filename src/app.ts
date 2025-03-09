import express from "express";
import {
  cadastrarProduto,
  listarTodosProduto,
  atualizarProduto,
  deletarProduto,
  filtrarProduto,
} from "./controller/ProdutoController";
import {
  atualizarUsuario,
  deletarUsuario,
  filtrarUsuario,
} from "./controller/UsuarioController";
import { register, login, updatePassword } from "./controller/authController";
import { verifyJWT } from "./middleware/authMiddleware";
import path from "path";

const app = express();
const PORT = 3040;

app.use(express.json());

// Servindo imagens
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Produtos
app.post("/produto", verifyJWT, cadastrarProduto); // CREATE
app.get("/produto", verifyJWT, listarTodosProduto); // GET ALL
app.get("/produto/:id", verifyJWT, filtrarProduto); // GET BY ID
app.put("/produto/:id", verifyJWT, atualizarProduto); // PUT
app.delete("/produto/:id", verifyJWT, deletarProduto); // DELETE

// Usuários
app.get("/usuario", verifyJWT, filtrarUsuario); // GET Usuário
app.put("/usuario", verifyJWT, atualizarUsuario); // PUT Atualizar Usuário
app.delete("/usuario", verifyJWT, deletarUsuario); // DELETE Usuário

// Cadastro de Usuário
app.post("/register", register); // POST para cadastro de usuário

// Login de Usuário
app.post("/login", login); // POST para login de usuário

// Atualização de Senha
app.put("/usuario/senha", verifyJWT, updatePassword); // PUT para atualizar a senha do usuário

app.listen(PORT, () => {
  console.log(`API online na porta: ${PORT}`);
});
