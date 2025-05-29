import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    // Dependency injection can be added here
    constructor (@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    getAllUser (): Promise<User[]> {
        return this.userRepository.find();
    }

    getUserById (id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }
}