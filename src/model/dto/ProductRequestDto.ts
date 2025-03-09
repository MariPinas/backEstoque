
export class ProductRequestDto {
    name: string;
    price: number;
    description: string;
    image: string;


    constructor(name?: string, price?: number, description?: string, image?: string) {
        this.name = name || '';
        this.price = price || 0;
        this.description = (description || '');
        this.image = (image || '');
    }
}