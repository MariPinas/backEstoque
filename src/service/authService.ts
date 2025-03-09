import bcrypt from "bcryptjs";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import jwt from "jsonwebtoken";
import { Usuario } from "../model/Usuario";

const JWT_SECRET = "cocacola";
const usuRepo = new UsuarioRepository();

export class AuthService {

  // Cadastro
  async registerUser(email: string, nome: string, senha: string) {
    const userExists = await usuRepo.findByEmail(email);
    if (userExists) {
      return { status: 400, response: { message: "E-mail já cadastrado!" } };
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = new Usuario(undefined, nome, email, hashedPassword);

    const createdUser = await usuRepo.insertUsuario(newUser);

    const token = jwt.sign(
      { id: createdUser.id, nome: createdUser.nome },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      status: 201,
      response: {
        message: "Cadastro realizado com sucesso!",
        token: token,
      },
    };
  }

  // Login 
  async loginUser(email: string, password: string) {
    const user = await usuRepo.findByEmail(email);
    if (!user) {
      return { status: 404, response: { message: "Usuário não encontrado!" } };
    }

    const isPasswordValid = await bcrypt.compare(password, user.senha);
    if (!isPasswordValid) {
      return { status: 401, response: { message: "Senha incorreta!" } };
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    return {
      status: 200,
      response: {
        message: "Login bem-sucedido!",
        token: token,
      },
    };
  }

  //att senha
  async updatePassword(email: string, senhaAntiga: string, novaSenha: string) {
    const user = await usuRepo.findByEmail(email);
    if (!user) {
      return { status: 404, response: { message: "Usuário não encontrado!" } };
    }

    const isMatch = await bcrypt.compare(senhaAntiga, user.senha);
    if (!isMatch) {
      return { status: 400, response: { message: "Senha antiga incorreta!" } };
    }

    const hashedNewPassword = await bcrypt.hash(novaSenha, 10);
    user.senha = hashedNewPassword;

    await usuRepo.updateUsuario(user);

    return {
      status: 200,
      response: { message: "Senha atualizada com sucesso!" },
    };
  }
}
