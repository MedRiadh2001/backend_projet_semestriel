import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Staff } from "../entites/Staff.entity";

@Injectable()
export class StaffRepository extends Repository<Staff>{
    constructor(private readonly dataSource: DataSource){
        super(Staff, dataSource.createEntityManager(),dataSource.createQueryRunner());
    }
}