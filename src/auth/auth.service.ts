import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginDto } from "src/dto/login.dto";
import { RegisterDto } from "src/dto/register.dto";
import { User } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { ResponseEntity } from "src/util/response.util";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    registerUser (registerDto: RegisterDto): Promise<User> {
        return this.userService.createUser(registerDto);
    }

    async loginUser (loginDto: LoginDto): Promise<ResponseEntity<string>> {
        const user: User = await this.userService.getUserByEmail(loginDto.getEmail());
        if (!user) {
            throw new BadRequestException("Sorry you provided bad credential please check them!!! 😔💔💔")
        }

        if (!bcrypt.compare(user.password, loginDto.getPassword())) {
            throw new BadRequestException("Sorry you provided bad credential please check your password!!! 😔💔💔")
        }

        return ResponseEntity.ok("Successfully logged in user!!! 🎉🎉🎉", this.jwtService.sign(user.email));
    }
}