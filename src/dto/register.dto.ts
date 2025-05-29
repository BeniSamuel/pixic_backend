import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "src/enums/role.enum";

export class RegisterDto {

    @IsNotEmpty({message: "Name is required niggas!!!"})
    private name: string;

    @IsNotEmpty({message: "Email is required niggas!!!"})
    @IsEmail()
    private email: string;

    @IsNotEmpty({message: "Password is required stu!! stu!! stupid!!!"})
    private password: string;

    @IsNotEmpty({message: "Stupid enter user role between CLIENT, PHOTOGRAPHER OR ADMIN"})
    private role: Role;

    public getName (): string {
        return this.name;
    }

    public getEmail (): string {
        return this.email;
    }

    public getPassword (): string {
        return this.password;
    }

    public getRole (): Role {
        return this.role;
    }
}
