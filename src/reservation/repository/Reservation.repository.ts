import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Reservation } from "../entities/Reservation.entity";

@Injectable()
export class ReservationRepository extends Repository<Reservation> {
    constructor(private readonly dataSource: DataSource) {
        super(Reservation, dataSource.createEntityManager(), dataSource.createQueryRunner());
    }
}