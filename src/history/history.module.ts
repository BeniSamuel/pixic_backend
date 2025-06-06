import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { HistoryController } from "./history.controller";
import { HistoryService } from "./history.service";

@Module({
    imports: [UserModule],
    controllers: [HistoryController],
    providers: [HistoryService]
})
export class HistoryModule {}