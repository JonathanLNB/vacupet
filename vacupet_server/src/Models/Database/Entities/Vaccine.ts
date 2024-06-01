import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import {Vaccinated} from "./Vaccinated";

@Entity()
export class Vaccine {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    Name: string
    @Column()
    Description: string
    @OneToMany(() => Vaccinated, (vaccinated) => vaccinated.Vaccine)
    Vaccinated: Vaccinated[]
}
