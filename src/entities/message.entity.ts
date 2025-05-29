import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    content: string;

    @Column()
    send_at: Date;

    @Column({nullable: false})
    @ManyToOne(() => User, (user) => user.id)
    sender: User;

    @Column({nullable: false})
    @ManyToOne(() => User, (user) => user.id)
    receiver: User;

    constructor (content: string, send_at: Date, sender: User, receiver: User) {
        this.content = content;
        this.send_at = send_at;
        this.sender = sender;
        this.receiver = receiver;
    }

}