import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { DataSource } from "typeorm";
import { Facture } from "../entities/Facture.entity";

@Injectable()
export class FactureRepository extends Repository<Facture>{
    constructor(private readonly dataSource: DataSource){
        super(Facture, dataSource.createEntityManager(),dataSource.createQueryRunner());
    }
}