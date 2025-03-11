import express from "express";
import cors from 'cors';
import {
  cadastrarProduto,
  listarTodosProduto,
  atualizarProduto,
  deletarProduto,
  filtrarProduto,
  calcularDashboard,
} from "./controller/ProdutoController";
import {
  atualizarUsuario,
  deletarUsuario,
  filtrarUsuario,
} from "./controller/UsuarioController";
import { register, login, updatePassword } from "./controller/authController";
import { verifyJWT } from "./middleware/authMiddleware";


const app = express();
const PORT = 3040;

app.use(express.json());
app.use(cors());

// Produtos
app.post("/produto", verifyJWT, cadastrarProduto); // CREATE
app.get("/produto", verifyJWT, listarTodosProduto); // GET ALL
app.get("/produto/:id", verifyJWT, filtrarProduto); // GET BY ID
app.put("/produto/:id", verifyJWT, atualizarProduto); // PUT
app.delete("/produto/:id", verifyJWT, deletarProduto); // DELETE

// Dashboard
app.get("/dashboard", verifyJWT, calcularDashboard); // GET para calcular os dados do dashboard

// Usuários
app.get("/usuario", verifyJWT, filtrarUsuario); // GET 
app.put("/usuario", verifyJWT, atualizarUsuario); // PUT  
app.delete("/usuario", verifyJWT, deletarUsuario); // DELETE 

// Cadastro de Usuario
app.post("/register", register); // POST


// Login de Usuario
app.post("/login", login); // POST 

// Atualizacao de Senha
app.put("/usuario/senha", verifyJWT, updatePassword); // PUT

app.listen(PORT, () => {
  console.log(`API online na porta: ${PORT}`);
});
