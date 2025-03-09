export class Usuario{
    id: number;
    nome: string;
    email: string;
    senha: string;



    constructor(id?:number, nome?:string, email?:string, senha?:string){
        this.validatesInformation(nome, email, senha);
        this.id = id || 0;
        this.nome = nome || '';
        this.email = email || '';
        this.senha = senha || '';
    }

    private validatesInformation(nome:any, email:any, senha:any){
        let error ='';
        if (typeof nome !== 'string' || typeof email !== 'string' || typeof senha !== 'string') {
            error += ("Informações incompletas ou incorretas. ");
        }

        if(error != ''){
            throw new Error(error);
        }
    }
}