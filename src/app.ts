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

import { register, login, updatePassword} from "./controller/authController";
import { verifyJWT } from "./middleware/authMiddleware";

const app = express();
const PORT = 3040;

app.use(express.json());

// Produtos
app.post("/produto", verifyJWT, cadastrarProduto); // POST
app.get("/produto", verifyJWT, listarTodosProduto); //GetAll
app.get("/produto/:id", verifyJWT, filtrarProduto); // GetById
app.put("/produto/:id", verifyJWT, atualizarProduto); // PUT
app.delete("/produto/:id", verifyJWT, deletarProduto); //DELETE

// Usuários
app.get("/usuario/:id", verifyJWT, filtrarUsuario); // Busca um usuario por ID
app.put("/usuario/:id", verifyJWT, atualizarUsuario); // Atualiza um usuario
app.delete("/usuario/:id", verifyJWT, deletarUsuario); // Deleta um usuario

// Autenticação
app.post("/login", login); // Autentica o usuario e gera o token JWT
app.post("/register", register); // Registra um novo usuario
app.put("/update-password", verifyJWT, updatePassword); // Atualiza a senha do usuario

app.listen(PORT, () => {
  console.log(`API online na porta: ${PORT}`);
});
