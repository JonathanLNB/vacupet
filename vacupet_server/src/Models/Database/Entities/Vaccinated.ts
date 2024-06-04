import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne} from "typeorm"
import {Pet} from "./Pet";
import {Vaccine} from "./Vaccine";

@Entity()
export class Vaccinated {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    ApplicationDate: Date
    @Column()
    NextApplicationDate: Date
    @Column()
    Weight: number
    @ManyToOne(() => Pet, (pet) => pet.Vaccinated)
    Pet: Pet
    @ManyToOne(() => Vaccine, (vaccine) => vaccine.Vaccinated)
    Vaccine: Vaccine
}
