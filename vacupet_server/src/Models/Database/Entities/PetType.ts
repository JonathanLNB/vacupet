import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import {Pet} from "./Pet";

@Entity()
export class PetType {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    Name: string
    @OneToMany(() => Pet, (pet) => pet.PetType, {cascade: true})
    Pets: Pet[]
}
