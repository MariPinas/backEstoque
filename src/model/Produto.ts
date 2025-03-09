export class Product{
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;



    constructor(id?:number, name?:string, price?:number, description?:string, image?:string){
        this.validatesInformation(name, price, description, image);
        this.id = id || 0;
        this.name = name || '';
        this.price = price || 0;
        this.description = description || '';
        this.image = image || '';
    }

    private validatesInformation(name:any, price:any, description:any,image:any){
        let error ='';
        if (typeof name !== 'string' || typeof price !== 'number' || typeof description !== 'string'|| typeof image !== 'string') {
            error += ("Informações incompletas ou incorretas. ");
        }

        if(error != ''){
            throw new Error(error);
        }
    }
}