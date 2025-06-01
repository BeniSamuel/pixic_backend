import { Status } from "src/enums/status.enum";
import { BookingDto } from "./booking.dto";
import { IsNotEmpty } from "class-validator";

export class UpdateBookingDto extends BookingDto {
    @IsNotEmpty({message: "Status must be updated"})
    status: Status;
}