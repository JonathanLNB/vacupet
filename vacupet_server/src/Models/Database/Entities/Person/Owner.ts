import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Pet} from "../Pet";
import {User} from "./User";

@Entity()
export class Owner {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    Address: string
    @OneToOne(() => User, {cascade: true})
    @JoinColumn()
    User: User
    @OneToMany(() => Pet, (pet) => pet.Owner, {cascade: true})
    Pets: Pet[]
}
