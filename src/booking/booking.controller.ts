import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { ResponseEntity } from "src/util/response.util";
import { Booking } from "src/entities/booking.entity";

@Controller("/api/pixic/v1/booking")
export class BookingController {
    constructor (private readonly bookService: BookingService) {}

    @Get("/all")
    @HttpCode(HttpStatus.OK)
    async getAllBooking (): Promise<ResponseEntity<Booking[]>> {
        return ResponseEntity.ok("Successfully obtained all booking", await this.bookService.getAllBooking());
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK | HttpStatus.NOT_FOUND)
    async getBookingById (@Param("id") id: number): Promise<ResponseEntity<Booking>> {
        const booking: Booking = await this.bookService.getBookingById(id);
        if (!booking) {
            return ResponseEntity.ok("Successfully obtained booking", booking);
        }
        return ResponseEntity.notFound("Failed to obtain booking not found", null);
    }

    @Get("/user/:client_id")
    @HttpCode(HttpStatus.OK | HttpStatus.NOT_FOUND)
    async getBookingByClientId (@Param("client_id") client_id: number): Promise<ResponseEntity<Booking[]>> {
        const bookings: Booking[] = await this.bookService.getBookingByUser(client_id);
        if (bookings.length !== 0) {
            return ResponseEntity.ok("Successfully obtained booking by client", bookings);
        } 
        return ResponseEntity.notFound("Failed to retrieve the booking by user", null);
    }

    @Get("/user/:booker_id")
    async getBookingByPhotographer (@Param("booker_id") booker_id: number): Promise<ResponseEntity<Booking[]>> {
        const bookings: Booking[] = await this.bookService.getBookingByPhotographer(booker_id);
        if (bookings.length !== 0) {
            return ResponseEntity.ok("Successfully retrieved all booking related to photographer", bookings);
        }
        return ResponseEntity.notFound("Failed to obtain booking related to photographer", null);
    }
}