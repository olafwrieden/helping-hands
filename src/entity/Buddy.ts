import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Users } from "./Users";

export enum Status {
    ACTIVE = "active",
    DECLINED = "declined",
    DEACTIVATED = "deactivated",
    PENDING = "pending"
}

@Entity({ orderBy: { connectedAt: "ASC"} })
export class Buddy {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    connectedAt: string;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.PENDING
    })
    status: string;

    @ManyToOne(type => Users, user => user.id)
    volunteer: string;

    @ManyToOne(type => Users, user => user.id)
    buddy: string;

    @Column()
    initiatedByBuddy: boolean;
}
