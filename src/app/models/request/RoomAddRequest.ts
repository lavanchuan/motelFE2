export class RoomAddRequest {
    name: string;
    area: string;
    price: number;
    sale: number;
    facility: string;
    motelId: number;

    constructor(name: string, area: string, price: number, sale: number, facility: string, motelId: number) {
        this.name = name;
        this.area = area;
        this.price = price;
        this.sale = sale;
        this.facility = facility;
        this.motelId = motelId;
    }
}