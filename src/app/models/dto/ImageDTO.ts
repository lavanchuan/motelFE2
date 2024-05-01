export class ImageDTO{
    id: number;
    motelRoomId: number;
    url: string;

    constructor(id: number, motelRoomId: number, url: string){
        this.id = id;
        this.motelRoomId = motelRoomId;
        this.url = url;
    }
}