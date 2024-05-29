import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class PetType {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    Name: string
}
