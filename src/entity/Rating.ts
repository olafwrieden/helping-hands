import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Rating {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column()
    comment: string;

    @ManyToOne(type => Users, user => user.id)
    userId: number

    @ManyToOne(type => Users, user => user.id)
    reviewerUserId: number
}
