import {Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, OneToMany} from "typeorm";
import { Rating } from "./Rating";

@Entity()
export class Users {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column("text")
    bio: string;

    @Column()
    gender: string;
    
    @Column()
    email: string;
     
    @Column()
    phone: string;
        
    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    zipCode: number

    @CreateDateColumn()
    createdOn: string

    @Column()
    enabled: boolean;

    @OneToMany(type => Rating, rating => rating.userId)
    ratings: Rating[]
}
