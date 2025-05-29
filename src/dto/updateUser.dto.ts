import { RegisterDto } from "./register.dto";

export class UserUpdateDto extends RegisterDto {
    private phone: number;
    
    public getPhone (): number {
        return this.phone;
    }
}