import { Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn, OneToMany } from "typeorm";
import { Rating } from "./Rating";

export enum Gender {
  FEMALE = "female",
  MALE = "male",
  OTHER = "other"
}

@Entity({ orderBy: { createdOn: "ASC"} })
export class Users {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: "text",
    default: ""
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

  @Column({ select: false })
  password: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  zipCode: number

  @CreateDateColumn()
  createdOn: string

  @Column({ default: true, select: false })
  enabled: boolean;

  @OneToMany(type => Rating, rating => rating.userId)
  ratings: Rating[]

  @Column({ default: false })
  isVolunteer: boolean

  @Column({ default: false })
  canDrive: boolean
}
