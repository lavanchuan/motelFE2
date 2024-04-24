export class MotelDTO {
    id: number;
    createAt: string;
    name: string;
    address: string;
    electric_price: string;
    water_price: string;
    status: string;
    ownerId: number;

    constructor(id: number, createAt: string, name: string, address: string,
        electric_price: string, water_price: string, status: string, ownerId: number) {
        this.id = id;
        this.createAt = createAt;
        this.name = name;
        this.address = address;
        this.electric_price = electric_price;
        this.water_price = water_price;
        this.status = status;
        this.ownerId = ownerId;
    }
}