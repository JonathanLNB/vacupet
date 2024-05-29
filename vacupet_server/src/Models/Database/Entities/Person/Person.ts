import {Column, PrimaryGeneratedColumn} from "typeorm";

export abstract class Person {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    Firstname: string
    @Column()
    Middlename: string
    @Column()
    Lastname: string
    @Column()
    Email: string
    @Column()
    PhoneNumber: string
    @Column()
    DateOfBirth: Date
}
