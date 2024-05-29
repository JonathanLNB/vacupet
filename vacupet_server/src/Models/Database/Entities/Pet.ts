import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable} from "typeorm"
import {PetType} from "./PetType";
import {Owner} from "./Person/Owner";
import {Allergy} from "./Allergy";

@Entity()
export class AccountType {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    Name: string
    @Column()
    DateOfBirth: Date
    @ManyToOne(() => PetType)
    @JoinColumn()
    PetType: PetType
    @ManyToOne(() => Owner)
    @JoinColumn()
    Owner: Owner
    @ManyToMany(() => Allergy)
    @JoinTable({
        joinColumn: {name: "IdAllergy"}
    })
    Allergies: Allergy[]
}
