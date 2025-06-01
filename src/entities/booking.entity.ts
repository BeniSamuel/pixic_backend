import { Status } from "src/enums/status.enum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Booking {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column({nullable: false})
    @ManyToOne(() => User, (user) => user.id)
    booker: User;

    @Column({nullable: false})
    details: string;

    @Column({type:"date", nullable: false, default: Date.now()})
    bookingDate: Date;

    @Column({type: "enum", enum: Status, default: Status.PENDING})
    status: Status;

    constructor (user: User, details: string, bookingDate: Date) {
        this.user = user;
        this.details = details;
        this.bookingDate = bookingDate;
    }
}