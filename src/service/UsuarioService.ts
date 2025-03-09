import { Usuario } from './../model/Usuario';
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class UsuarioService {
  usuarioRepository: UsuarioRepository = new UsuarioRepository();


  async atualizarUsuario(id: number, usuarioData: any): Promise<Usuario> {
    const { nome, email, senha } = usuarioData;

    const usuario = new Usuario(id, nome, email, senha);
    console.log(id, "ID DO BAGULHO")
    await this.usuarioRepository.updateUsuario(usuario);
    console.log("Service - Usuario atualizado: ", usuario);
    return usuario;
  }

  async deletarUsuario(id: number): Promise<Usuario | null> {
    try {
        const usuarioEncontrado = await this.usuarioRepository.filterUsuarioById(id);

        if (!usuarioEncontrado) {
            return null; 
        }

        // Deletando o usuário
        await this.usuarioRepository.deleteUsuario(id);

        return usuarioEncontrado;
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        throw new Error("Erro ao deletar usuário.");
    }
}


  async filtrarUsuario(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.filterUsuarioById(id);
    console.log("Service - Usuario filtrado: ", usuario);
    if(usuario){
        console.log("Service - Filtrar ID", usuario);
        return usuario;
    }else{
        throw new Error("404 Not Found  - Usuario com esse id nao existe!!!");
    }
}

}
