import { HttpStatus } from "@nestjs/common";

export class ResponseEntity <T> {
    success: boolean;
    message: string;
    data: T;
    status: number;

    constructor (success: boolean, message: string, data: T, status: number) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.status = status;
    }

    static ok <T> (message: string, data: T): ResponseEntity<T> {
        return new ResponseEntity(true, message, data, HttpStatus.OK);
    }

    static notFound <T> (message: string, data: T): ResponseEntity<T> {
        return new ResponseEntity(false, message, data, HttpStatus.NOT_FOUND);
    }

    static badRequest<T> (message: string, data: T): ResponseEntity<T> {
        return new ResponseEntity(false, message, data, HttpStatus.BAD_REQUEST);
    }
}