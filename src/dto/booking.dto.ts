import { IsNotEmpty } from "class-validator";
import { Status } from "src/enums/status.enum";

export class BookingDto {
    @IsNotEmpty({message: "User id is required to book"})
    user_id: number;

    @IsNotEmpty({message: "Booker id is required please"})
    booker_id: number;

    @IsNotEmpty({message: "Booking details is needed please"})
    details: string;

    @IsNotEmpty({message: "Booking date is required please"})
    bookingDate: Date;
}