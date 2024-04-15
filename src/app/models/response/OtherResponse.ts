export class OtherResponse<T>{
    status: number;
    data: T;

    constructor(status: number, data: T){
        this.status = status;
        this.data = data;
    }
}