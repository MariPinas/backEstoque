export class ProductRequestDto {
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  quantidade: number;

  constructor(
    nome?: string,
    preco?: number,
    descricao?: string,
    imagem?: string,
    quantidade?: number
  ) {
    this.nome = nome || "";
    this.preco = preco || 0;
    this.descricao = descricao || "";
    this.imagem = imagem || "";
    this.quantidade = quantidade || 0;
  }
}
