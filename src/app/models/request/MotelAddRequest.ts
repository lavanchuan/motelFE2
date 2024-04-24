export class MotelAddRequest{
    name: string;
    address: string;
    electric_price: string;
    water_price: string;
    ownerId: number;

    constructor(name: string, address: string, electric_price: string, water_price: string, ownerId: number){
        this.name = name;
        this.address = address;
        this.electric_price = electric_price;
        this.water_price = water_price;
        this.ownerId = ownerId;
    }
    
}