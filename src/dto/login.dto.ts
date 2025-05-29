import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {

    @IsNotEmpty({message: "Niggas enter the email!!!"})
    @IsEmail()
    private email: string;

    @IsNotEmpty({message: "Niggas enter the password!!!"})
    private password: string;

    public getEmail (): string {
        return this.email;
    }

    public getPassword (): string {
        return this.password;
    }
}