export class Produto{
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    imagem: string;
    quantidade: number;



    constructor(id?:number, nome?:string, preco?:number, descricao?:string, imagem?:string, quantidade?:number){
        this.validatesInformation(nome, preco, descricao, imagem, quantidade);
        this.id = id || 0;
        this.nome = nome || '';
        this.preco = preco || 0;
        this.descricao = descricao || '';
        this.imagem = imagem || '';
        this.quantidade = quantidade || 0;
    }

    private validatesInformation(nome:any, preco:any, descricao:any,imagem:any, quantidade:any){
        let error ='';
        if (typeof nome !== 'string' || typeof preco !== 'number' || typeof descricao !== 'string'|| typeof imagem !== 'string'|| typeof quantidade !== 'number') {
            error += ("Informações incompletas ou incorretas. ");
        }

        if(error != ''){
            throw new Error(error);
        }
    }
}