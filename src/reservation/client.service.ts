import { Injectable } from "@nestjs/common";
import { ClientRepository } from "./repository/Client.repository";
import { CreateClientDto } from "./types/dtos/CreateClientDto.dto";

@Injectable()
export class ClientService {
    constructor(
        private readonly clientRepository: ClientRepository,
    ) { }

    async createClient(dto: CreateClientDto) {
        const client = this.clientRepository.create(dto);
        return this.clientRepository.save(client);
    }

    async getAllClients() {
        return this.clientRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
}