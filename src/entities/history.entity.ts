import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class History {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column()
    action: string;

    @Column({type: "date", nullable: false, default: () => "CURRENT_TIMESTAMP"})
    timestamp: Date;

    @Column()
    details: string;

    constructor (user: User, action: string, details: string) {
        this.user = user;
        this.action = action;
        this.details = details;
        this.timestamp = new Date();
    }
}