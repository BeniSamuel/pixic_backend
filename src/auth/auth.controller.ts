import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/entities/user.entity";
import { ResponseEntity } from "src/util/response.util";
import { RegisterDto } from "src/dto/register.dto";
import { LoginDto } from "src/dto/login.dto";

@Controller("/api/pixic/v1/auth")
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post("/register")
    @HttpCode(HttpStatus.CREATED)
    async registerUser (@Body() registerDto: RegisterDto): Promise<ResponseEntity<User>> {
        return ResponseEntity.created("Successfully registered user!!! 🎉🎉🎉", await this.authService.registerUser(registerDto));
    }

    @Post("/login")
    @HttpCode(HttpStatus.OK)
    async loginUser (@Body() loginDto: LoginDto): Promise<ResponseEntity<string>> {
        return this.authService.loginUser(loginDto);
    }

}