import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { DataSource } from "typeorm";
import { RoomType } from "../entities/RoomType.entity";

@Injectable()
export class RoomTypeRepository extends Repository<RoomType>{
    constructor(private readonly dataSource: DataSource){
        super(RoomType, dataSource.createEntityManager(),dataSource.createQueryRunner());
    }
}