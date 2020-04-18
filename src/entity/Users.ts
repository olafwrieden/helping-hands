import { Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, OneToMany } from "typeorm";
import { Rating } from "./Rating";

export enum Gender {
    FEMALE = "female",
    MALE = "male",
    OTHER = "other"
}
@Entity()
export class Users {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        type: "text",
        nullable: true
    })
    bio: string;

    @Column({
        type: "enum",
        enum: Gender
    })
    gender: string;

    @Column({
        unique: true
    })
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

    @Column({
        default: true
    })
    enabled: boolean;

    @OneToMany(type => Rating, rating => rating.userId)
    ratings: Rating[]

    @Column()
    isVolunteer: boolean

    @Column()
    canDrive: boolean
}
