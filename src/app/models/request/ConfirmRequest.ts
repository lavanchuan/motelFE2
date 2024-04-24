export class ConfirmRequest {
    id: number;
    reason: string;

    constructor(id: number, reason: string) {
        this.id = id;
        this.reason = reason;
    }
}