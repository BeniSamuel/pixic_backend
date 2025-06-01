import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "src/dto/register.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { UserUpdateDto } from "src/dto/updateUser.dto";

@Injectable()
export class UserService {
    // Dependency injection can be added here
    constructor (@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    getAllUser (): Promise<User[]> {
        return this.userRepository.find();
    }

    getUserById (id: number): Promise<User | null> {
        return this.userRepository.findOne({where: {id}});
    }

    getUserByEmail (email: string): Promise<User | null> {
        return this.userRepository.findOne({where: {email}});
    }

    async createUser (registerDto: RegisterDto): Promise<User> {
        const user = this.getUserByEmail(registerDto.getEmail());
        if (user) { 
            throw new BadRequestException("User already exist stupid!!! 😔💔💔"); 
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(registerDto.getPassword(), salt);
        const newUser = new User(registerDto.getName(), registerDto.getEmail(), hashedPassword, registerDto.getRole());

        return this.userRepository.save(newUser);
    }

    async updateUser (id: number, updateUserDto: UserUpdateDto): Promise<User> {
        const user = await this.getUserById(id);
        if (!user) {
            return null;
        }

        user.name = updateUserDto.getName();
        user.email = updateUserDto.getEmail();
        user.password = await bcrypt.hash(updateUserDto.getPassword(), 10);
        user.phone = updateUserDto.getPhone();
        user.role = updateUserDto.getRole();

        return this.userRepository.save(user);
    }

    async deleteUserById (id: number): Promise<Boolean> {
        const user = await this.getUserById(id);
        if (user) {
            this.userRepository.delete(user);
            return true;
        }
        return false;
    }
}