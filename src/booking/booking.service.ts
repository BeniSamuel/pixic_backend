import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookingDto } from "src/dto/booking.dto";
import { Booking } from "src/entities/booking.entity";
import { User } from "src/entities/user.entity";
import { Status } from "src/enums/status.enum";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";

@Injectable()
export class BookingService {
    constructor (
        @InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
        private readonly userService: UserService
    ) {}

    getAllBooking (): Promise<Booking[]> {
        return this.bookingRepository.find();
    }

    getBookingById (id: number): Promise<Booking> {
        return this.bookingRepository.findOne({where: {id}});
    }

    async getBookingByUser (user_id: number): Promise<Booking[]> {
        const user: User = await this.userService.getUserById(user_id);
        if (user) {
            return this.bookingRepository.find({where: 
                {
                    user: user
                }
            });
        }
        return null;
    }

    async getBookingByPhotographer (user_id: number): Promise<Booking[]> {
        const user: User = await this.userService.getUserById(user_id);
        if (user) {
            return this.bookingRepository.find({
                where: {
                    booker: user
                }
            })
        }
    } 

    async createBooking (bookingDto: BookingDto): Promise<Booking> {
        const user: User = await this.userService.getUserById(bookingDto.user_id);
        if (!user) {
            return null;
        }

        const booker: User = await this.userService.getUserById(bookingDto.booker_id);
        if (!booker) {
            return null;
        }

        const newBooking: Booking = new Booking(user, booker, bookingDto.details, bookingDto.bookingDate, Status.PENDING);
        return this.bookingRepository.save(newBooking);
    }

    async updateBookingById (id: number, bookingDto: BookingDto): Promise<Booking> {
        const booking: Booking = await this.getBookingById(id);
        if (!booking) {
            return null;
        }

        const user: User = await this.userService.getUserById(bookingDto.user_id);
        if (!user) {
            return null;
        }

        const booker: User = await this.userService.getUserById(bookingDto.booker_id);
        if (!booker) {
            return null;
        }

        booking.user = user;
        booking.booker = booker;
        booking.details = bookingDto.details;
        booking.bookingDate = bookingDto.bookingDate;
        
        return this.bookingRepository.save(booking);
    }

    async deleteBookingById (id: number): Promise<Boolean> {
        const booking: Booking = await this.getBookingById(id);
        if (booking) {
            this.bookingRepository.delete(booking);
            return true;
        }
        return false;
    }
}