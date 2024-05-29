import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Allergy {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    Name: string
    @Column()
    Description: string
}
