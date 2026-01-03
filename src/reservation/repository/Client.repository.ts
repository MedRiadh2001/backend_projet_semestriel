import { Injectable } from "@nestjs/common";
import { Client } from "../entities/Client.entity";
import { DataSource, Repository } from "typeorm";


@Injectable()
export class ClientRepository extends Repository<Client> {
    constructor(private readonly dataSource: DataSource) {
        super(Client, dataSource.createEntityManager(), dataSource.createQueryRunner());
    }
}