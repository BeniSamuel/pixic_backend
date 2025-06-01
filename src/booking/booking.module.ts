import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Booking } from "src/entities/booking.entity";
import { UserModule } from "src/user/user.module";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
@Module({
    imports: [TypeOrmModule.forFeature([Booking]), UserModule],
    controllers: [BookingController],
    providers: [BookingService]
})

export class BookingModule {}