import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Users } from "./Users";

export enum Type {
	ASSISTANCE = "assist",
	PICKUP = "pickup",
	TALK = "talk",
	THIRD_PARTY_ASSISTANCE = "tpa"
}

export enum Status {
	COMPLETED = "complete",
	PENDING = "pending",
	ACCEPTED = "accepted",
	CANCELLED = "cancelled"
}

export enum PaymentType {
	CASH = "cash",
	CREDIT = "credit",
	NOPAYMENT = "nopayment"
}

@Entity({ orderBy: { requestedAt: "ASC"} })
export class Request {

	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToOne(type => Users, user => user.id)
	requestedUser: string;

	@ManyToOne(type => Users, user => user.id)
	fulfillingUser: string;

	@Column({
		type: "enum",
		enum: Type,
		default: Type.ASSISTANCE
	})
	type: string;

	@Column("text")
	details: string;

	@Column()
	status: string;

	@Column({
		type: "enum",
		enum: PaymentType,
		default: PaymentType.NOPAYMENT
	})
	payment: string;

	// @Column({
	// 	type: "tsrange",
	// 	transformer: {
	// 		to: (entityValue) => {
	// 			return `[${entityValue.start},${entityValue.end})`
	// 		},
	// 		from: (databaseValue) => {
	// 			const ranges = databaseValue.replace(/(\[*)(\)*)(\"*)/g, "").split(',');
	// 			return {
	// 				start: ranges[0],
	// 				end: ranges[1]
	// 			}
	// 		}
	// 	}
	// })
	// completionTimeRange: {
	// 	start: "string",
	// 	end: "end"
	// };

	@CreateDateColumn()
	requestedAt: string;

	@Column()
	address: string;

	@Column()
	city: string;

	@Column()
	zipCode: number

	// @Column()
	// latitude: string;

	// @Column()
	// longitude: string;
}