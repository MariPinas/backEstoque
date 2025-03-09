export class Product{
    id: number;
    name: string;
    email: string;
    senha: string;



    constructor(id?:number, name?:string, email?:string, senha?:string){
        this.validatesInformation(name, email, senha);
        this.id = id || 0;
        this.name = name || '';
        this.email = email || '';
        this.senha = senha || '';
    }

    private validatesInformation(name:any, email:any, senha:any){
        let error ='';
        if (typeof name !== 'string' || typeof email !== 'string' || typeof senha !== 'string') {
            error += ("Informações incompletas ou incorretas. ");
        }

        if(error != ''){
            throw new Error(error);
        }
    }
}