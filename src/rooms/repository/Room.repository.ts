import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Room } from "../entities/Room.entity";
import { DataSource } from "typeorm";

@Injectable()
export class RoomRepository extends Repository<Room>{
    constructor(private readonly dataSource: DataSource){
        super(Room, dataSource.createEntityManager(),dataSource.createQueryRunner());
    }
}