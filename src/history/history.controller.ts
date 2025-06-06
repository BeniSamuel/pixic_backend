import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { History } from "src/entities/history.entity";
import { ResponseEntity } from "src/util/response.util";
import { HistoryDto } from "src/dto/history.dto";

@Controller("/api/pixic/v1/history")
export class HistoryController {
    constructor (private readonly historyService: HistoryService) {}

    @Get("/all")
    @HttpCode(HttpStatus.OK)
    async getAllHistory (): Promise<ResponseEntity<History[]>> {
        return ResponseEntity.ok("Successfully retrieved all history!!!", await this.historyService.getAllHistory());
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK | HttpStatus.NOT_FOUND)
    async getHistoryById (@Param("id") id: number): Promise<ResponseEntity<History>> {
        const history: History = await this.historyService.getHistoryById(id);
        if (history) {
            return ResponseEntity.ok("Successfully obtained history", history);
        }
        return ResponseEntity.notFound("Failed to obtain history", null);
    }

    @Get("/user/:user_id")
    @HttpCode(HttpStatus.OK | HttpStatus.NOT_FOUND)
    async getHistoryByUser (@Param("user_id") user_id: number): Promise<ResponseEntity<History[]>> {
        const histories: History[] = await this.historyService.getHistoryByUser(user_id);
        if (histories.length !== 0) {
            return ResponseEntity.ok("Found user history!!!", histories);
        }
        return ResponseEntity.notFound("Failed to find user history", null);
    }

    @Post("/create")
    @HttpCode(HttpStatus.CREATED)
    async createHistory (@Body() historyDto: HistoryDto): Promise<ResponseEntity<History>> {
        const newHistory: History = await this.historyService.createHistory(historyDto);
        if (newHistory) {
            return ResponseEntity.created("Successfully created history", newHistory);
        }
        return ResponseEntity.badRequest("Bad request check your dto", null);
    }

    @Put("/update/:id")
    @HttpCode(HttpStatus.OK | HttpStatus.NOT_FOUND)
    async updateHistoryById (@Param("id") id: number, @Body() historyDto: HistoryDto): Promise<ResponseEntity<History>> {
        const history: History = await this.historyService.updateHistory(id, historyDto);
        if (history) {
            return ResponseEntity.ok("Successfully update history", history);
        }
        return ResponseEntity.notFound("History not found!!!", null);
    }

    @Delete("/delete/:id")
    @HttpCode(HttpStatus.OK | HttpStatus.NOT_FOUND)
    async deleteHistoryById (@Param("id") id: number): Promise<ResponseEntity<Boolean>> {
        return this.historyService.deleteHistory(id) ?
        ResponseEntity.ok("Successfully delete history", true) :
        ResponseEntity.notFound("Failed to delete history not found", false);        
    }
}