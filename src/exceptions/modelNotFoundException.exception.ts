export class ModelNotFoundException extends Error {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = 'ModelNotFoundException';
        this.statusCode = 404;
    }
}