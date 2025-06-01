import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking } from "src/entities/booking.entity";
import { User } from "src/entities/user.entity";
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

    async createBooking (): Promise<Booking> {
        const user: User = await this.userService.get
    }
}