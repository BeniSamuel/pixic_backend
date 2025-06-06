import { InjectRepository } from "@nestjs/typeorm";
import { HistoryDto } from "src/dto/history.dto";
import { History } from "src/entities/history.entity";
import { User } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";

export class HistoryService {
    constructor (
        @InjectRepository(History) private readonly historyRepository: Repository<History>,
        private readonly userService: UserService
    ) {}

    getAllHistory (): Promise<History[]> {
        return this.historyRepository.find();
    }

    getHistoryById (id: number): Promise<History> {
        return this.historyRepository.findOne({where: {id}});
    }

    async getHistoryByUser (user_id: number): Promise<History[]> {
        const user: User = await this.userService.getUserById(user_id);
        if (user) {
            return this.historyRepository.find({where: {user}});
        }
        return null;
    }

    async createHistory (historyDto: HistoryDto): Promise<History> {
        const user: User = await this.userService.getUserById(historyDto.user_id);
        if (user) {
            const newHistory: History = new History(user, historyDto.action, historyDto.details);
            return this.historyRepository.save(newHistory);
        }
        return null;
    }

    async updateHistory (id: number, historyDto: HistoryDto): Promise<History> {
        const history: History = await this.getHistoryById(id);
        if (!history) {
            return null;
        }

        const user: User = await this.userService.getUserById(historyDto.user_id);
        if (!user) {
            return null;
        }
        history.user = user;
        history.action = historyDto.action;
        history.details = historyDto.details;
        history.timestamp = new Date();
        
        return this.historyRepository.save(history);
    }

    async deleteHistory (id: number): Promise<Boolean> {
        const history: History = await this.getHistoryById(id);
        if (!history) {
            return false;
        }

        this.historyRepository.delete(history);
        return true;
    }


}