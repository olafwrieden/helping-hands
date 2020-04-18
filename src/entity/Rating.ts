import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Rating {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    rating: number;

    @Column()
    comment: string;

    @ManyToOne(type => Users, user => user.id)
    userId: string

    @ManyToOne(type => Users, user => user.id)
    reviewerUserId: string
}
