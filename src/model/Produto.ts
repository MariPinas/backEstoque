export class Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
  usuario_id: number;

  constructor(
    id?: number,
    nome?: string,
    preco?: number,
    descricao?: string,
    quantidade?: number,
    usuario_id?: number
  ) {
    this.validatesInformation(
      nome,
      preco,
      descricao,
      quantidade,
      usuario_id
    );

    this.id = id ?? 0;
    this.nome = nome ?? "";
    this.preco = preco ?? 0;
    this.descricao = descricao ?? "";
    this.quantidade = quantidade ?? 0;
    this.usuario_id = usuario_id ?? 0;
  }

  private validatesInformation(
    nome: any,
    preco: any,
    descricao: any,
    quantidade: any,
    usuario_id: any
  ) {
    let error = "";


    if (
      nome == null ||
      preco == null ||
      descricao == null ||
      quantidade == null ||
      usuario_id == null
    ) {
      error += "Informações incompletas. ";
    }

    if (
      typeof nome !== "string" ||
      typeof preco !== "number" ||
      typeof descricao !== "string" ||
      typeof quantidade !== "number" ||
      typeof usuario_id !== "number"
    ) {
      error += "Informações incorretas. ";
    }

    if (error !== "") {
      throw new Error(error);
    }
  }
}
