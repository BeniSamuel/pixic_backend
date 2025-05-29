import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Notification {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;

    @Column({ nullable: false})
    message: string;

    @Column()
    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column({ type: "date", nullable: false, default: () => "CURRENT_TIMESTAMP" })
    generatedAt: Date;

    constructor (subject: string, message: string, user: User) {
        this.subject = subject;
        this.message = message;
        this.user = user;
        this.generatedAt = new Date();
    }
}