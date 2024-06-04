import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable} from "typeorm"
import {PetType} from "./PetType";
import {Owner} from "./Person/Owner";
import {Allergy} from "./Allergy";
import {Vaccinated} from "./Vaccinated";

@Entity()
export class Pet {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    Name: string
    @Column()
    DateOfBirth: Date
    @Column()
    Gender: boolean
    @Column()
    Race: string
    @ManyToOne(() => PetType)
    @JoinColumn()
    PetType: PetType
    @ManyToOne(() => Owner)
    @JoinColumn()
    Owner: Owner
    @OneToMany(()=>Vaccinated,(vaccinated)=>vaccinated.Pet)
    Vaccinated:Vaccinated[]
    @ManyToMany(() => Allergy)
    @JoinTable({
        joinColumn: {name: "IdAllergy"}
    })
    Allergies: Allergy[]
}
