import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/entities/user.entity";
import { ResponseEntity } from "src/util/response.util";
import { UserUpdateDto } from "src/dto/updateUser.dto";

@Controller("/api/pixic/v1/user")
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get("/all")
    @HttpCode(HttpStatus.OK)
    async getAllUsers (): Promise<ResponseEntity<User[]>> {
        return ResponseEntity.ok("Successfully obtained all users!!! 🎉🎉🎉", await this.userService.getAllUser());
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK | HttpStatus.NOT_FOUND)
    async getUserById (@Param("id") id: number): Promise<ResponseEntity<User>> {
        const user: User = await this.userService.getUserById(id);
        if (user) {
            return ResponseEntity.ok("Successfully obtained user!!! 🎉🎉🎉", user);
        }
        return ResponseEntity.notFound("Failed to obtain user!!! 😔💔💔", null);
    }

    @Get("/me")
    @HttpCode(HttpStatus.OK)
    async getCurrentUser (@Req() req: any): Promise<ResponseEntity<User>> {
        const email: string = req.user;
        return ResponseEntity.ok("Successfully obtained the current user!!!", await this.userService.getUserByEmail(email));
    }

    @Put("/update/:id")
    @HttpCode(HttpStatus.OK | HttpStatus.NOT_FOUND)
    async updateUserById (@Param("id") id: number, @Body() updateUserDto: UserUpdateDto): Promise<ResponseEntity<User>> {
        const user: User = await this.userService.updateUser(id, updateUserDto);
        if (user) {
            return ResponseEntity.ok("Successfully updated user!!! 🎉🎉🎉", user);
        }
        return ResponseEntity.notFound("Failed to update user!!! 😔💔💔", null);

    }

    @Delete("/delete/:id")
    @HttpCode(HttpStatus.OK | HttpStatus.NOT_FOUND)
    async deleteUserById (@Param("id") id: number): Promise<ResponseEntity<Boolean>> {
        return this.userService.deleteUserById(id) ?
        ResponseEntity.ok("Successfully deleted user!!! 🎉🎉🎉", true) :
        ResponseEntity.notFound("Failed to delete user!!! 😔💔💔", null);
    }
}