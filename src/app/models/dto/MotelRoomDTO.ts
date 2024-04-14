import { ROOM_STATUS } from "../../services/Instance";

export class MotelRoomDTO {
    id: number;
    name: string;
    createAt: string;
    area: string;
    price: number;
    sale: number;
    facility: string;
    status: string;
    motelId: number;
    adminId: number;

    constructor(id: number, name: string, createAt: string, area: string, price: number, sale: number,
        facility: string, status: string, motelId: number, adminId: number) {
        this.id = id;
        this.name = name;
        this.createAt = createAt;
        this.area = area;
        this.price = price;
        this.sale = sale;
        this.facility = facility;
        this.status = status;
        this.motelId = motelId;
        this.adminId = adminId;
    }
}