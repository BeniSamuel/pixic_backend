import { IsNotEmpty } from "class-validator";

export class HistoryDto {
    @IsNotEmpty({message: "We must have the user who performed an action"})
    user_id: number;

    @IsNotEmpty({message: "We must have an action performed description"})
    action: string;


    @IsNotEmpty({message: "Provide the detailed explanation of history"})
    details: string;
}