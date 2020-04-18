import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Request {

	@PrimaryGeneratedColumn()
	id: number;
	
	@ManyToOne(type => Users, user => user.id)
	requestedUserId: string;

	@ManyToOne(type => Users, user => user.id)
	fulfillingUserId: string;

	@Column()
	type: string;

	@Column("text")
	details: string;

	@Column()
	status: string;

	@Column()
	latitude: string;

	@Column()
	longitude: string;
}